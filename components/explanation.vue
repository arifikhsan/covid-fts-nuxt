<template>
  <div class="flex flex-col space-y-2">
    <div class="p-4">
      <h2 class="text-xl font-semibold text-indigo-600">Hasil Prediksi</h2>
      <span v-if="todayCase" class="text-sm"
        >Berdasarkan data historis dari
        {{ humanizeDate(firstCase.date_time) }} sampai
        {{ humanizeDate(lastCase.date_time) }}.</span
      >
    </div>
    <div class="px-4">
      <div
        v-if="todayCase"
        class="flex flex-col space-y-2 md:justify-between md:flex-row md:space-y-0 md:space-x-6"
      >
        <div class="md:w-1/2">
          <h3 class="text-lg font-semibold text-indigo-500">
            Periode terakhir
          </h3>
          <div class="text-gray-800">
            <p>Tanggal: {{ humanizeDate(todayCase.date_time) }}</p>
            <p>Kasus Aktif: {{ todayCase.active_cumulative }}</p>
          </div>
        </div>
        <div class="md:w-1/2">
          <h3 class="text-lg font-semibold text-indigo-500">
            Periode selanjutnya
          </h3>
          <div class="text-gray-800">
            <p>Tanggal: {{ humanizeDate(nextDayCase.date_time) }}</p>
            <p>Kasus Aktif: {{ nextDayCase.forecast }}</p>
          </div>
        </div>
      </div>
      <div v-else><loading /></div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
import { mapGetters } from "vuex";
import Loading from "@/components/loading";
import ChevronDoubleDownIcon from "@/components/icon/chevron-double-down-icon.vue";
import ChevronDoubleUpIcon from "@/components/icon/chevron-double-up-icon.vue";
import { dateOptions } from "@/config/dateOptions";

export default {
  components: {
    loading: Loading,
    "chevron-double-down-icon": ChevronDoubleDownIcon,
    "chevron-double-up-icon": ChevronDoubleUpIcon
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    ...mapGetters(["series"]),
    todayCase() {
      return this.series[this.series.length - 2];
    },
    nextDayCase() {
      return this.series[this.series.length - 1];
    },
    firstCase() {
      return this.series[0];
    },
    lastCase() {
      return this.series[this.series.length - 2];
    }
  },
  methods: {
    humanizeDate(date) {
      return new Date(date).toLocaleDateString("id-ID", dateOptions);
    }
  }
};
</script>
