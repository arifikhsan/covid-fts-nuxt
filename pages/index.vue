<template>
  <div class="pt-4 pb-16 mx-auto md:max-w-xl lg:max-w-2xl">
    <div class="p-4">
      <h1 class="text-4xl font-bold leading-tight text-indigo-600 md:text-center">
        Peramalan Kasus Aktif COVID-19 di Indonesia
      </h1>
      <p class="mt-3 text-indigo-500 md:text-center">
        Metode Fuzzy Time Series Model Chen
      </p>
    </div>
    <prediction />
    <explanation />
    <about />

    <!-- <client-only>
      <div v-if="state.loading" class="flex items-center justify-center">
        <p>Loading...</p>
      </div>
      <div v-else-if="state.dataObtained">
        <div class="mt-6 text-center">
          <h2 class="text-2xl font-bold text-indigo-500">Bulan Januari 2021</h2>
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
      </div>
    </client-only> -->
  </div>
</template>

<script>

import Prediction from "~/components/prediction.vue";
import Explanation from "~/components/explanation.vue";
import About from "~/components/about.vue";

export default {
  components: {
    prediction: Prediction,
    explanation: Explanation,
    about: About,
  },
  head() {
    return {
      title: "Fuzzy Time Series COVID-19"
    };
  },
};
</script>
