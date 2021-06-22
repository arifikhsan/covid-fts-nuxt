<template>
  <div class="flex flex-col p-4 space-y-4">
    <div>
      <h2 class="text-xl font-semibold text-indigo-600">Grafik Prediksi</h2>
      <span class="text-sm">Tanggal: {{ now }}</span>
    </div>
    <div
      style="min-height: 16rem"
      class="flex items-center justify-center border border-indigo-400"
    >
      <p v-if="state.loading">Loading...</p>
      <div v-if="done" class="overflow-auto">
        <line-chart :chart-data="chartdata" :options="options"></line-chart>
      </div>
      <!-- <p>{{ counter }}</p>
      <button @click="incrementCounter">increment</button> -->
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/line-chart";
import { map, min, max, uniq } from "lodash";

export default {
  components: {
    "line-chart": LineChart
  },
  computed: {
    now() {
      return new Date().toDateString();
    },
    counter() {
      return this.$store.state.counter;
    }
  },
  data() {
    return {
      state: {
        loading: false,
        dataObtained: false,
        dataPredicted: false
      },
      done: false,
      chartdata: null,
      series: null,
      options: null,

      dMin: 0,
      dMax: 0,
      intervalCount: 0,
      intervalLength: 0,
      intervals: [],
      groups: [],
      forecasts: [],
      finalMape: 0
    };
  },
  async created() {
    await this.getLiveSeries();
    await this.predictCovid();
    this.updateVuex();
  },
  methods: {
    async getLiveSeries() {
      this.state.loading = true;
      // await this.$axios.get('https://data.covid19.go.id/public/api/update.json')
      let url = "https://covid-fts-rails.herokuapp.com/cases";
      this.series = [];
      try {
        let res = await this.$axios.get(url);
        // console.log(res)
        res.data.cases
          .slice(-30)
          .reverse()
          .map(item => {
            let date = new Date(Date.parse(item.date_time));
            let label = `${date.getDate()}/${date.getMonth() + 1}`;

            this.series.push({ label, ...item });
          });
        this.state.dataObtained = true;
        // console.log(this.series);
      } catch (e) {
        console.log(e);
      } finally {
        this.state.loading = false;
      }
    },
    async predictCovid() {
      let values = map(this.series, "active_cumulative");

      // himpunan semesta
      let dMin = min(values);
      let dMax = max(values);
      let n = values.length;
      let intervalCount = Math.round(1 + 3.322 * Math.log10(n));
      let intervalLength = (dMax - dMin) / intervalCount;

      // console.log("dMin", dMin);
      // console.log("dMax", dMax);
      // console.log("intervalCount", intervalCount);
      // console.log("intervalLength", intervalLength);

      this.dMin = dMin;
      this.dMax = dMax;
      this.intervalCount = intervalCount;
      this.intervalLength = intervalLength;

      // interval
      let intervals = [];
      for (let i = 0; i < intervalCount; i++) {
        let low = dMin + intervalLength * i;
        let high = dMin + intervalLength * (i + 1);
        let median = (high - low) / 2 + low;
        let a = `A${i + 1}`;

        intervals.push({ low, high, median, a });
      }

      // console.log("intervals");
      // console.table(intervals);

      this.intervals = intervals;

      // FLR
      this.series.map((seri, iSeries) => {
        // fuzzifikasi
        for (let i = 0; i < intervals.length; i++) {
          let interval = intervals[i];

          if (
            seri.active_cumulative >= interval.low &&
            seri.active_cumulative <= interval.high
          ) {
            seri.fuzzifikasi = interval.a;
            break;
          }
        }

        // relasi
        if (iSeries !== 0) {
          let previousSeri = this.series[iSeries - 1];

          seri.relasi = `${previousSeri.fuzzifikasi} → ${seri.fuzzifikasi}`;
        }
      });

      // console.log("series");
      // console.table(this.series);

      // FRG
      let groups = [];

      for (let iInterval = 0; iInterval < intervals.length; iInterval++) {
        let interval = intervals[iInterval];

        // FRG
        let groupName = `Group ${iInterval + 1}`;
        let groupRelation = [];

        for (let i = 0; i < this.series.length; i++) {
          let seri = this.series[i];

          if (i !== 0) {
            let relasi = seri.relasi.split(" ");

            if (interval.a === relasi[0]) {
              groupRelation.push(seri.relasi);
            }
          }
        }

        groupRelation = uniq(groupRelation, true);
        groups.push({ groupName, groupRelation });
      }

      // console.log("groups");
      // console.table(groups);

      this.groups = groups;

      // forecast
      let forecasts = [];

      // todo: loop array interval dan group bareng
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        let interval = intervals[i];

        let currentState = interval.a;
        let nextStates = [];
        group.groupRelation.forEach(relation => {
          let rel = relation.split(" ");
          let lastRelation = rel[rel.length - 1];

          nextStates.push(lastRelation);
        });

        let medians = [];

        nextStates.forEach(nextState => {
          let intervalItem = intervals.find(e => e.a == nextState);
          medians.push(intervalItem.median);
        });

        let formula = [];
        medians.forEach(median => {
          formula.push(this.twoDigit(median));
        });

        formula = `average(${formula})`;

        let forecast = medians.reduce((a, b) => a + b) / medians.length;
        forecasts.push({ currentState, nextStates, formula, forecast });
      }

      // console.log("forecasts");
      // console.table(forecasts);

      this.forecasts = forecasts;

      // apply forecasts
      this.series.map((seri, iSeries) => {
        if (iSeries !== 0) {
          for (let i = 0; i < forecasts.length; i++) {
            let forecast = forecasts[i];

            if (seri.fuzzifikasi === forecast.currentState) {
              seri.forecast = forecast.forecast;
            }
          }
        }
      });

      // predict next day
      for (let i = 0; i < forecasts.length; i++) {
        let forecast = forecasts[i];

        let lastSeries = this.series[this.series.length - 1];
        if (lastSeries.fuzzifikasi === forecast.currentState) {
          let lastDate = new Date(
            Date.parse(this.series[this.series.length - 1].date_time)
          );
          lastDate.setDate(lastDate.getDate() + 1);
          let label = `${lastDate.getDate()}/${lastDate.getMonth() + 1}`;

          this.series.push({
            label,
            forecast: forecast.forecast
          });
        }
      }

      // console.log("this.series");
      // console.table(this.series);

      // MAPE
      for (let i = 0; i < this.series.length; i++) {
        let seri = this.series[i];

        if (i !== 0) {
          let mape =
            Math.abs(seri.active_cumulative - seri.forecast) /
            seri.active_cumulative;
          seri.mape = mape;

          // percentage %
          seri.percentage = mape * 100;
        } else {
          seri.mape = 0;
          seri.percentage = 0;
        }
      }

      // final result

      let mapes = map(this.series, "mape");
      mapes.shift();
      mapes.pop();
      // console.log(mapes);
      this.finalMape = mapes.reduce((a, b) => a + b) / mapes.length;
      // console.log(this.finalMape);

      // chart

      let date = map(this.series, "label");
      let actual = map(this.series, "active_cumulative");
      let forecast = map(this.series, "forecast");

      this.chartdata = {
        labels: date,
        datasets: [
          {
            label: "Aktual",
            data: actual,
            backgroundColor: "transparent",
            borderColor: "#FF6384"
          },
          {
            label: "Prediksi",
            data: forecast,
            backgroundColor: "transparent",
            borderColor: "#36A2EB"
          }
        ]
      };

      this.options = {
        scales: {
          yAxes: [
            {
              ticks: {
                // beginAtZero: true,
                // min: 80000
              }
            }
          ]
        }
      };

      this.done = true;
    },
    twoDigit(number) {
      try {
        return number.toLocaleString(undefined, {
          maximumFractionDigits: 2
        });
      } catch {
        return 0;
      }
    },
    threeDigit(number) {
      try {
        return number.toLocaleString(undefined, {
          maximumFractionDigits: 3
        });
      } catch {
        return 0;
      }
    },
    incrementCounter() {
      this.$store.commit("increment");
    },
    updateVuex() {
      this.$store.commit("addSeries", this.series);
      this.$store.commit("insertDMin", this.dMin);
      this.$store.commit("insertDMax", this.dMax);
      this.$store.commit("insertIntervalCount", this.intervalCount);
      this.$store.commit("insertIntervalLength", this.intervalLength);
      this.$store.commit("addIntervals", this.intervals);
      this.$store.commit("addGroups", this.groups);
      this.$store.commit("addForecasts", this.forecasts);
      this.$store.commit("insertFinalMape", this.finalMape);
    }
  }
};
</script>
