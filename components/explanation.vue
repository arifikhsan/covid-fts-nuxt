<template>
  <div class="flex flex-col space-y-2">
    <div class="p-4">
      <h2 class="text-xl font-semibold text-indigo-600">Hasil Prediksi</h2>
      <span class="text-sm">lorem ipsum</span>
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
    <div class="px-4 pt-4">
      <button
        @click="isOpen = !isOpen"
        class="inline-flex items-center px-4 py-2 space-x-2 text-sm text-white transition duration-200 bg-indigo-600 focus:outline-none hover:bg-indigo-700"
      >
        <span>Detail prediksi</span>
        <chevron-double-up-icon v-if="isOpen" />
        <chevron-double-down-icon v-else />
      </button>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="px-4 pt-4">
        <h2 class="text-xl font-semibold text-indigo-600">Detail Prediksi</h2>
        <p class="mt-4 text-lg font-semibold text-indigo-500">1. Tabel Dataset</p>
        <table class="w-full mt-2 border border-collapse border-indigo-800 table-auto min-w-max">
          <thead>
            <tr class="text-indigo-600 bg-indigo-200">
              <th class="border border-indigo-600">No</th>
              <th class="border border-indigo-600">Tanggal</th>
              <th class="border border-indigo-600">Kasus Aktif</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in series" :key="item.id" class="even:bg-indigo-100">
              <td class="border border-indigo-600">{{ index + 1 }}</td>
              <td class="border border-indigo-600">{{ item.label }}</td>
              <td class="border border-indigo-600">{{ item.active_cumulative }}</td>
            </tr>
          </tbody>
        </table>
        <p class="mt-4 text-lg font-semibold text-indigo-500">2. Tabel Dataset</p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">3. Tabel Dataset</p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">4. Tabel Dataset</p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">5. Tabel Dataset</p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">6. Tabel Dataset</p>
      </div>
    </transition>
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

export default {
  components: {
    loading: Loading,
    "chevron-double-down-icon": ChevronDoubleDownIcon,
    "chevron-double-up-icon": ChevronDoubleUpIcon
  },
  data() {
    return {
      isOpen: true
    };
  },
  computed: {
    ...mapGetters(["series"]),
    todayCase() {
      return this.series[this.series.length - 2];
    },
    nextDayCase() {
      return this.series[this.series.length - 1];
    }
  },
  methods: {
    humanizeDate(date) {
      return new Date(date).toDateString();
    }
  }
};
</script>
