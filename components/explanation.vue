<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-row justify-between p-4">
      <div>
        <h2 class="text-xl font-semibold text-indigo-600">Penjelasan</h2>
        <span class="text-sm">Hasil Prediksi</span>
      </div>
      <div class="flex items-center justify-center">
        <button
          class="px-4 py-2 text-white transition duration-200 bg-indigo-600 hover:bg-indigo-700"
        >
          Detail Prediksi
        </button>
      </div>
    </div>
    <div class="px-4">
      <div v-if="todayCase" class="flex flex-col space-y-2">
        <div>
          <h3 class="text-lg font-semibold text-indigo-500">Periode terakhir</h3>
          <p>Tanggal: {{ humanizeDate(todayCase.date_time) }}</p>
          <p>Kasus Aktif: {{ todayCase.active_cumulative }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-indigo-500">Periode selanjutnya</h3>
          <p>Tanggal: {{ humanizeDate(nextDayCase.date_time) }}</p>
          <p>Kasus Aktif: {{ nextDayCase.forecast }}</p>
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSeries"]),
    todayCase() {
      return this.getSeries[this.getSeries.length - 2];
    },
    nextDayCase() {
      return this.getSeries[this.getSeries.length - 1];
    }
  },
  methods: {
    humanizeDate(date) {
      return new Date(date).toDateString();
    }
  }
};
</script>
