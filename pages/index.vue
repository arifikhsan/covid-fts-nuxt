<template>
  <div class="max-w-3xl pt-4 pb-16 mx-auto">
    <div class="p-4 text-center">
      <h1 class="text-3xl font-bold text-indigo-600">
        Peramalan Kasus Aktif Covid-19 di Indonesia
      </h1>
    </div>
    <!-- <div class="mt-6 text-center">
      <button>Januari 2021</button>
      <button @click="getLiveSeries">Live</button>
    </div> -->
    <client-only v-if="done">
      <div class="mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Bulan Januari 2021</h2>
        <p class="text-sm italic text-indigo-400">
          Metode Fuzzy Time Series Model Chen
        </p>
        <line-chart
          class="mt-4"
          :chart-data="chartdata"
          :options="options"
        ></line-chart>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Data 2021</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Tanggal</td>
              <td class="border border-indigo-600">Kasus Aktif</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(seri, i) in series" :key="i">
              <template v-if="i !== series.length - 1">
                <td class="border border-indigo-600">{{ seri.name }}</td>
                <td class="border border-indigo-600">
                  {{ seri.dirawat_kumulatif }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-3xl font-bold text-indigo-500">Perhitungan</h2>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Himpunan Semesta</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Nama</td>
              <td class="border border-indigo-600">Nilai</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-indigo-600">Min</td>
              <td class="border border-indigo-600">{{ dMin }}</td>
            </tr>
            <tr>
              <td class="border border-indigo-600">Max</td>
              <td class="border border-indigo-600">{{ dMax }}</td>
            </tr>
            <tr>
              <td class="border border-indigo-600">Jumlah Interval</td>
              <td class="border border-indigo-600">{{ intervalCount }}</td>
            </tr>
            <tr>
              <td class="border border-indigo-600">Lebar Interval</td>
              <td class="border border-indigo-600">
                {{ twoDigit(intervalLength) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Interval</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">U</td>
              <td class="border border-indigo-600">Dari</td>
              <td class="border border-indigo-600">Sampai</td>
              <td class="border border-indigo-600">A</td>
              <td class="border border-indigo-600">Median</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(interval, i) in intervals" :key="i">
              <td class="border border-indigo-600">{{ `U${i + 1}` }}</td>
              <td class="border border-indigo-600">
                {{ twoDigit(interval.low) }}
              </td>
              <td class="border border-indigo-600">
                {{ twoDigit(interval.high) }}
              </td>
              <td class="border border-indigo-600">
                {{ twoDigit(interval.a) }}
              </td>
              <td class="border border-indigo-600">
                {{ twoDigit(interval.median) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">
          Fuzzy Logic Relation
        </h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Periode</td>
              <td class="border border-indigo-600">Value</td>
              <td class="border border-indigo-600">Fuzzyfication</td>
              <td class="border border-indigo-600">Relation</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(seri, i) in series" :key="i">
              <template v-if="i !== series.length - 1">
                <td class="border border-indigo-600">
                  {{ seri.name }}
                </td>
                <td class="border border-indigo-600">
                  {{ seri.dirawat_kumulatif }}
                </td>
                <td class="border border-indigo-600">
                  {{ seri.fuzzifikasi }}
                </td>
                <td v-if="i !== 0" class="border border-indigo-600">
                  {{ seri.relasi }}
                </td>
                <td v-else></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">
          Fuzzy Logic Relation Grup
        </h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Group</td>
              <td class="border border-indigo-600">Relationship</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(group, i) in groups" :key="i">
              <td class="border border-indigo-600">{{ group.groupName }}</td>
              <td class="border border-indigo-600">
                {{ group.groupRelation }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Prediksi</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Current State</td>
              <td class="border border-indigo-600">Next State</td>
              <td class="border border-indigo-600">Perhitungan</td>
              <td class="border border-indigo-600">Nilai Prediksi</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(forecast, i) in forecasts" :key="i">
              <td class="border border-indigo-600">
                {{ forecast.currentState }}
              </td>
              <td class="border border-indigo-600">
                {{ forecast.nextStates }}
              </td>
              <td class="border border-indigo-600">{{ forecast.formula }}</td>
              <td class="border border-indigo-600">
                {{ twoDigit(forecast.forecast) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Hasil Prediksi</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">Tanggal</td>
              <td class="border border-indigo-600">Kasus Aktif</td>
              <td class="border border-indigo-600">Fuzzifikasi</td>
              <td class="border border-indigo-600">Prediksi</td>
              <td class="border border-indigo-600">MAPE</td>
              <td class="border border-indigo-600">Persentase</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(seri, i) in series" :key="i">
              <td class="border border-indigo-600">{{ seri.name }}</td>
              <td class="border border-indigo-600">
                {{ seri.dirawat_kumulatif }}
              </td>
              <td class="border border-indigo-600">
                {{ seri.fuzzifikasi }}
              </td>
              <td class="border border-indigo-600">
                {{ seri.forecast ? twoDigit(seri.forecast) : "" }}
              </td>
              <template v-if="i !== series.length - 1">
                <td class="border border-indigo-600">
                  {{ threeDigit(seri.mape) }}
                </td>
                <td class="border border-indigo-600">
                  {{ threeDigit(seri.percentage) }} %
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-4 mt-6 text-center">
        <h2 class="text-2xl font-bold text-indigo-500">Hasil</h2>
        <table
          class="w-full mt-4 border border-collapse border-indigo-800 table-auto"
        >
          <thead>
            <tr class="bg-indigo-200">
              <td class="border border-indigo-600">MAPE</td>
              <td class="border border-indigo-600">Prosentase</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-indigo-600">
                {{ threeDigit(finalMape) }}
              </td>
              <td class="border border-indigo-600">
                {{ threeDigit(finalMape * 100) }} %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </client-only>
  </div>
</template>

<script>
import LineChart from "@/components/line-chart";
import { map, min, max, uniq } from "lodash";

export default {
  components: {
    "line-chart": LineChart
  },
  head() {
    return {
      title: "Fuzzy Time Series"
    };
  },
  data() {
    return {
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
  computed: {
    // forecast() {
    //   if (this.covid) {
    //     let newForecast = [...this.covid.data.forecast];
    //     newForecast.unshift(0);
    //     return newForecast;
    //   } else {
    //     return [];
    //   }
    // }
  },
  async created() {
    await this.getSeries();
    await this.predictCovid();
  },
  methods: {
    async getLiveSeries() {
      try {
        let res = await this.$axios.get(
          "https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian"
        );
        this.series = res.data.slice(-30);
      } catch (e) {
        console.log(e);
      }
    },
    async getSeries() {
      this.series = [
        { name: "1-Jan", dirawat_kumulatif: 111005 },
        { name: "2-Jan", dirawat_kumulatif: 110400 },
        { name: "3-Jan", dirawat_kumulatif: 110679 },
        { name: "4-Jan", dirawat_kumulatif: 110089 },
        { name: "5-Jan", dirawat_kumulatif: 110693 },
        { name: "6-Jan", dirawat_kumulatif: 112593 },
        { name: "7-Jan", dirawat_kumulatif: 114766 },
        { name: "8-Jan", dirawat_kumulatif: 117704 },
        { name: "9-Jan", dirawat_kumulatif: 120928 },
        { name: "10-Jan", dirawat_kumulatif: 122873 },
        { name: "11-Jan", dirawat_kumulatif: 123636 },
        { name: "12-Jan", dirawat_kumulatif: 126313 },
        { name: "13-Jan", dirawat_kumulatif: 129628 },
        { name: "14-Jan", dirawat_kumulatif: 133149 },
        { name: "15-Jan", dirawat_kumulatif: 138238 },
        { name: "16-Jan", dirawat_kumulatif: 143517 },
        { name: "17-Jan", dirawat_kumulatif: 145482 },
        { name: "18-Jan", dirawat_kumulatif: 144798 },
        { name: "19-Jan", dirawat_kumulatif: 146842 },
        { name: "20-Jan", dirawat_kumulatif: 149388 },
        { name: "21-Jan", dirawat_kumulatif: 151658 },
        { name: "22-Jan", dirawat_kumulatif: 156683 },
        { name: "23-Jan", dirawat_kumulatif: 158751 },
        { name: "24-Jan", dirawat_kumulatif: 162617 },
        { name: "25-Jan", dirawat_kumulatif: 161636 },
        { name: "26-Jan", dirawat_kumulatif: 163526 },
        { name: "27-Jan", dirawat_kumulatif: 164113 },
        { name: "28-Jan", dirawat_kumulatif: 166540 },
        { name: "29-Jan", dirawat_kumulatif: 170017 },
        { name: "30-Jan", dirawat_kumulatif: 174083 },
        { name: "31-Jan", dirawat_kumulatif: 175095 },
        { name: "1-Feb", dirawat_kumulatif: 175349 },
        { name: "2-Feb", dirawat_kumulatif: 172576 },
        { name: "3-Feb", dirawat_kumulatif: 175236 },
        { name: "4-Feb", dirawat_kumulatif: 174798 },
        { name: "5-Feb", dirawat_kumulatif: 176672 }
      ];
    },
    async predictCovid() {
      let values = map(this.series, "dirawat_kumulatif");

      // himpunan semesta
      let dMin = min(values);
      let dMax = max(values);
      let n = values.length;
      let intervalCount = Math.round(1 + 3.322 * Math.log10(n));
      let intervalLength = (dMax - dMin) / intervalCount;

      console.log("dMin", dMin);
      console.log("dMax", dMax);
      console.log("intervalCount", intervalCount);
      console.log("intervalLength", intervalLength);

      this.dMin = dMin;
      this.dMax = dMax;
      this.intervalCount = intervalCount;
      this.intervalLength = intervalLength;

      // interval
      let intervals = [];
      for (let i = 0; i < intervalCount; i++) {
        const low = dMin + intervalLength * i;
        const high = dMin + intervalLength * (i + 1);
        const median = (high - low) / 2 + low;
        const a = `A${i + 1}`;

        intervals.push({ low, high, median, a });
      }

      console.log("intervals");
      // console.table(intervals);

      this.intervals = intervals;

      // FLR
      this.series.map((seri, iSeries) => {
        // fuzzifikasi
        for (let i = 0; i < intervals.length; i++) {
          const interval = intervals[i];

          if (
            seri.dirawat_kumulatif >= interval.low &&
            seri.dirawat_kumulatif <= interval.high
          ) {
            seri.fuzzifikasi = interval.a;
            break;
          }
        }

        // relasi
        if (iSeries !== 0) {
          const previousSeri = this.series[iSeries - 1];

          seri.relasi = `${previousSeri.fuzzifikasi} → ${seri.fuzzifikasi}`;
        }
      });

      console.log("series");
      console.table(this.series);

      // FRG
      const groups = [];

      for (let iInterval = 0; iInterval < intervals.length; iInterval++) {
        const interval = intervals[iInterval];

        // FRG
        const groupName = `Group ${iInterval + 1}`;
        let groupRelation = [];

        for (let i = 0; i < this.series.length; i++) {
          const seri = this.series[i];

          if (i !== 0) {
            const relasi = seri.relasi.split(" ");

            if (interval.a === relasi[0]) {
              groupRelation.push(seri.relasi);
            }
          }
        }

        groupRelation = uniq(groupRelation, true);
        groups.push({ groupName, groupRelation });
      }

      console.log("groups");
      console.table(groups);

      this.groups = groups;

      // forecast
      const forecasts = [];

      // todo: loop array interval dan group bareng
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const interval = intervals[i];

        const currentState = interval.a;
        const nextStates = [];
        group.groupRelation.forEach(relation => {
          let rel = relation.split(" ");
          let lastRelation = rel[rel.length - 1];

          nextStates.push(lastRelation);
        });

        const medians = [];

        nextStates.forEach(nextState => {
          const intervalItem = intervals.find(e => e.a == nextState);
          medians.push(intervalItem.median);
        });

        const formula = [];
        medians.forEach(median => {
          formula.push(this.twoDigit(median));
        });

        formula = `average(${formula})`;

        const forecast = medians.reduce((a, b) => a + b) / medians.length;
        forecasts.push({ currentState, nextStates, formula, forecast });
      }

      console.log("forecasts");
      console.table(forecasts);

      this.forecasts = forecasts;

      // apply forecasts
      this.series.map((seri, iSeries) => {
        if (iSeries !== 0) {
          for (let i = 0; i < forecasts.length; i++) {
            const forecast = forecasts[i];

            if (seri.fuzzifikasi === forecast.currentState) {
              seri.forecast = forecast.forecast;
            }
          }
        }
      });

      // predict next day
      for (let i = 0; i < forecasts.length; i++) {
        const forecast = forecasts[i];

        const lastSeries = this.series[this.series.length - 1];
        if (lastSeries.fuzzifikasi === forecast.currentState) {
          this.series.push({
            name: "besoknya",
            forecast: forecast.forecast
          });
        }
      }

      console.log("this.series");
      console.table(this.series);

      // MAPE
      for (let i = 0; i < this.series.length; i++) {
        const seri = this.series[i];

        if (i !== 0) {
          const mape =
            Math.abs(seri.dirawat_kumulatif - seri.forecast) /
            seri.dirawat_kumulatif;
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
      console.log(mapes);
      this.finalMape = mapes.reduce((a, b) => a + b) / mapes.length;
      console.log(this.finalMape);

      // chart

      const date = map(this.series, "name");
      const actual = map(this.series, "dirawat_kumulatif");
      const forecast = map(this.series, "forecast");

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
                beginAtZero: true
              }
            }
          ]
        }
      };

      this.done = true;

      // let intervalValues = dMin
      // let middleValues = null
      // times(intervalCount, () => {

      // })

      //   try {
      //     this.covid = await this.$axios.post(
      //       "https://django-fts.herokuapp.com/fts/predict",
      //       {
      //         train,
      //         test: [...train],
      //         mode: "chen"
      //       }
      //     );

      //     let date = range(1, 31);

      //     this.chartdata = {
      //       labels: date,
      //       datasets: [
      //         {
      //           label: "Kasus Positif",
      //           data: this.covid.data.train,
      //           backgroundColor: "transparent",
      //           borderColor: "#FF6384"
      //         },
      //         {
      //           label: "Prediksi",
      //           data: this.covid.data.forecast,
      //           backgroundColor: "transparent",
      //           borderColor: "#36A2EB"
      //         }
      //       ]
      //     };
      //   } catch (error) {
      //     console.log(error);
      //   }
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
    }
  }
};
</script>
