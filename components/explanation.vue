<template>
  <div class="flex flex-col space-y-2">
    <div class="p-4">
      <h2 class="text-xl font-semibold text-indigo-600">Hasil Prediksi</h2>
      <span v-show="todayCase" class="text-sm"
        >Berdasarkan data historis dari {{ firstCase() }} sampai
        {{ lastCase() }}.</span
      >
    </div>

    <div class="px-4">
      <div
        v-if="todayCase()"
        class="flex flex-col space-y-2 lg:flex-col lg:space-x-0 lg:space-y-2 md:justify-between md:flex-row md:space-y-0 md:space-x-6"
      >
        <div class="md:w-1/2 lg:w-full">
          <h3 class="text-lg font-semibold text-indigo-500">
            Periode selanjutnya
          </h3>
          <div class="text-gray-800">
            <p>Tanggal: {{ nextDayCase() }}</p>
            <p>Kasus Aktif: {{ nextDayCaseForecast() }}</p>
          </div>
        </div>
        <accuracy />
      </div>
      <div v-else><loading /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "@/components/loading";
import Accuracy from "@/components/accuracy";
import ChevronDoubleDownIcon from "@/components/icon/chevron-double-down-icon.vue";
import ChevronDoubleUpIcon from "@/components/icon/chevron-double-up-icon.vue";
import { dateOptions } from "@/config/dateOptions";

export default {
  components: {
    loading: Loading,
    accuracy: Accuracy,
    "chevron-double-down-icon": ChevronDoubleDownIcon,
    "chevron-double-up-icon": ChevronDoubleUpIcon
  },
  data() {
    return {
      isOpen: false
    };
  },
  created() {
    console.log(this.series[0]);
  },
  computed: {
    ...mapGetters(["series"])
  },
  methods: {
    humanizeDate(date) {
      return new Date(date).toLocaleDateString("id-ID", dateOptions);
    },
    firstCase() {
      return this.humanizeDate(this.series[0].date_time);
    },
    lastCase() {
      return this.humanizeDate(this.series[this.series.length - 2].date_time);
    },
    todayCase() {
      return this.series[this.series.length - 2];
    },
    nextDayCase() {
      return this.humanizeDate(this.series[this.series.length - 1]);
    },
    nextDayCaseForecast() {
      return this.series[this.series.length - 1].forecast;
    }
  }
};
</script>
