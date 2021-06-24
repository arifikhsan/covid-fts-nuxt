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
      <div v-if="isOpen" class="px-4">
        <p>Tabel Dataset</p>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Kasus Aktif</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in series" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.active_cumulative }}</td>
            </tr>
          </tbody>
        </table>
        {{ series }}
      </div>
    </transition>
  </div>
</template>

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
    ...mapGetters(['series']),
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
