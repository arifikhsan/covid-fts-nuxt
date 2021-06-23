<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-row justify-between p-4">
      <div>
        <h2 class="text-xl font-semibold text-indigo-600">Hasil Prediksi</h2>
        <span class="text-sm">lorem ipsum</span>
      </div>
    </div>
    <div class="px-4">
      <div
        v-if="todayCase"
        class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6"
      >
        <div>
          <h3 class="text-lg font-semibold text-indigo-500">
            Periode terakhir
          </h3>
          <div class="text-gray-800">
            <p>Tanggal: {{ humanizeDate(todayCase.date_time) }}</p>
            <p>Kasus Aktif: {{ todayCase.active_cumulative }}</p>
          </div>
        </div>
        <div>
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
    <div class="px-4">
      <button
        @click="isOpen = !isOpen"
        class="inline-flex items-center px-4 py-2 space-x-2 text-sm text-white transition duration-200 bg-indigo-600 focus:outline-none hover:bg-indigo-700"
      >
        <span>Detail prediksi</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 hover:animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="px-4">
        <p>apa</p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loading from "@/components/loading";

export default {
  components: {
    loading: Loading
  },
  data() {
    return {
      isOpen: true
    };
  },
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
