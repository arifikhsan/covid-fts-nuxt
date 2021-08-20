<template>
  <div class="flex flex-col p-4 space-y-4">
    <div>
      <h2 class="text-xl font-semibold text-indigo-600">Grafik Prediksi</h2>
      <span class="text-sm">Tanggal: {{ now }}</span>
    </div>
    <div style="min-height: 16rem" class="flex items-center justify-center">
      <div v-if="state.loading">
        <loading />
      </div>
      <div v-if="done" class="w-full overflow-auto">
        <line-chart :chart-data="chartdata" :options="options"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/line-chart";
import Loading from "@/components/loading";
import { map, min, max, uniq } from "lodash";
import { dateOptions } from "@/config/dateOptions";

export default {
  components: {
    "line-chart": LineChart,
    loading: Loading
  },
  computed: {
    now() {
      return new Date().toLocaleDateString("id-ID", dateOptions);
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
    // if (process.env.NODE_ENV === "production") {
    //   await this.getLiveSeries();
    // } else {
    await this.getStaticSeries();
    // }
    await this.predictCovid();
    this.updateVuex();
  },
  methods: {
    async getStaticSeries() {
      this.state.loading = true;

      let jsonCases = {
        cases: [
          {
            id: "611dc3abc3b4c700041b7c5a",
            active_cumulative: 343203,
            date_time: "2021-08-18T00:00:00.000Z"
          },
          {
            id: "611dc3abc3b4c700041b7c59",
            active_cumulative: 358357,
            date_time: "2021-08-17T00:00:00.000Z"
          },
          {
            id: "611dc3aac3b4c700041b7c58",
            active_cumulative: 371021,
            date_time: "2021-08-16T00:00:00.000Z"
          },
          {
            id: "6119a6ba343a3b0004359686",
            active_cumulative: 384807,
            date_time: "2021-08-15T00:00:00.000Z"
          },
          {
            id: "6118975e02cadd00041225c5",
            active_cumulative: 395577,
            date_time: "2021-08-14T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b14",
            active_cumulative: 400129,
            date_time: "2021-08-13T00:00:00.000Z"
          },
          {
            id: "611764426ec7c40004092b16",
            active_cumulative: 400129,
            date_time: "2021-08-13T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b12",
            active_cumulative: 412776,
            date_time: "2021-08-12T00:00:00.000Z"
          },
          {
            id: "611764426ec7c40004092b15",
            active_cumulative: 412776,
            date_time: "2021-08-12T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b10",
            active_cumulative: 426170,
            date_time: "2021-08-11T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b13",
            active_cumulative: 426170,
            date_time: "2021-08-11T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b11",
            active_cumulative: 437055,
            date_time: "2021-08-10T00:00:00.000Z"
          },
          {
            id: "611764416ec7c40004092b0f",
            active_cumulative: 437055,
            date_time: "2021-08-10T00:00:00.000Z"
          },
          {
            id: "6111df3a319ed7000440bc0a",
            active_cumulative: 448508,
            date_time: "2021-08-09T00:00:00.000Z"
          },
          {
            id: "6111df39319ed7000440bc09",
            active_cumulative: 474233,
            date_time: "2021-08-08T00:00:00.000Z"
          },
          {
            id: "6111df39319ed7000440bc08",
            active_cumulative: 497824,
            date_time: "2021-08-07T00:00:00.000Z"
          },
          {
            id: "6111df39319ed7000440bc07",
            active_cumulative: 507375,
            date_time: "2021-08-06T00:00:00.000Z"
          },
          {
            id: "6111df39319ed7000440bc06",
            active_cumulative: 518310,
            date_time: "2021-08-05T00:00:00.000Z"
          },
          {
            id: "6111df38319ed7000440bc05",
            active_cumulative: 524011,
            date_time: "2021-08-04T00:00:00.000Z"
          },
          {
            id: "6111df38319ed7000440bc04",
            active_cumulative: 524142,
            date_time: "2021-08-03T00:00:00.000Z"
          },
          {
            id: "6111df38319ed7000440bc03",
            active_cumulative: 523164,
            date_time: "2021-08-02T00:00:00.000Z"
          },
          {
            id: "6107227f682e1e0004c7d7a5",
            active_cumulative: 535135,
            date_time: "2021-08-01T00:00:00.000Z"
          },
          {
            id: "61055987427c2500041ad178",
            active_cumulative: 545447,
            date_time: "2021-07-31T00:00:00.000Z"
          },
          {
            id: "61055986427c2500041ad177",
            active_cumulative: 549343,
            date_time: "2021-07-30T00:00:00.000Z"
          },
          {
            id: "61055986427c2500041ad176",
            active_cumulative: 554484,
            date_time: "2021-07-29T00:00:00.000Z"
          },
          {
            id: "61055986427c2500041ad175",
            active_cumulative: 558392,
            date_time: "2021-07-28T00:00:00.000Z"
          },
          {
            id: "61055986427c2500041ad174",
            active_cumulative: 556281,
            date_time: "2021-07-27T00:00:00.000Z"
          },
          {
            id: "61055985427c2500041ad173",
            active_cumulative: 560275,
            date_time: "2021-07-26T00:00:00.000Z"
          },
          {
            id: "61055985427c2500041ad172",
            active_cumulative: 573908,
            date_time: "2021-07-25T00:00:00.000Z"
          },
          {
            id: "61055985427c2500041ad171",
            active_cumulative: 574135,
            date_time: "2021-07-24T00:00:00.000Z"
          }
        ]
      };
      this.series = [];

      jsonCases.cases
        .slice(-30)
        .reverse()
        .map(item => {
          let date = new Date(Date.parse(item.date_time));
          let label = `${date.getDate()}/${date.getMonth() + 1}`;

          this.series.push({ label, ...item });
        });
      this.state.dataObtained = true;
      this.state.loading = false;

      // console.log(jsonCases);
    },
    async getLiveSeries() {
      this.state.loading = true;
      // await this.$axios.get('https://data.covid19.go.id/public/api/update.json')
      let url =
        process.env.BACKEND_URL ||
        "https://covid-fts-rails.herokuapp.com/cases";
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
            forecast: Math.floor(forecast.forecast),
            date_time: lastDate.toISOString()
          });
        }
      }

      // console.log("this.series");
      // console.table(this.series);

      // MAPE
      // for (let i = 0; i < this.series.length; i++) {
      //   let seri = this.series[i];

      //   if (i !== 0) {
      //     let mape =
      //       Math.abs(seri.active_cumulative - seri.forecast) /
      //       seri.active_cumulative;
      //     seri.mape = mape;

      //     // percentage %
      //     seri.percentage = mape * 100;
      //   } else {
      //     seri.mape = 0;
      //     seri.percentage = 0;
      //   }
      // }

      // final result

      // let mapes = map(this.series, "mape");
      // mapes.shift();
      // mapes.pop();

      // console.log(mapes);
      // this.finalMape = mapes.reduce((a, b) => a + b) / mapes.length;
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
        responsive: true,
        // maintainAspectRatio: false,
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
      // this.$store.commit("insertFinalMape", this.finalMape);
    }
  }
};
</script>
