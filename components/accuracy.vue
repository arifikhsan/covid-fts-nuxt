<template>
  <div class="md:w-1/2 lg:w-full">
    <h3 class="text-lg font-semibold text-indigo-500">
      Uji Ketepatan Peramalan
    </h3>
    <div class="text-gray-800">
      <p><abbr title="Mean Absolute Percentage Error">MAPE</abbr>: {{ mape }}%</p>
      <p>Akurasi: {{ showAccuracy }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mean } from "lodash";

export default {
  computed: {
    ...mapGetters(["series"]),
    showAccuracy() {
      if (this.mape < 10) {
        return 'Peramalan sangat akurat';
      } else if (this.mape >= 10 && this.mape < 20) {
        return 'Peramalan baik';
      } else if (this.mape >= 20 && this.mape < 50) {
        return 'Peramalan layak';
      } else if (this.mape >= 50) {
        return 'Peramalan kurang akurat';
      } else {
        return 'Loading...';
      }
    }
  },
  data() {
    return {
      mse: 0,
      mape: 0,
      mae: 0
    };
  },
  created() {
    this.calculateError();
    this.calculateAccuracy();
    // console.table(this.series);
  },
  methods: {
    calculateError() {
      for (let i = 0; i < this.series.length; i++) {
        let seri = this.series[i];

        if (i !== 0 && seri.active_cumulative) {
          let error = seri.forecast - seri.active_cumulative;
          let error_squared = Math.pow(error, 2);
          let absolute_error = Math.abs(error);
          let absolute_pe = (absolute_error / seri.active_cumulative) * 100;

          seri.error = error;
          seri.error_squared = error_squared;
          seri.absolute_error = absolute_error;
          seri.absolute_pe = absolute_pe;
        }
      }
    },
    calculateAccuracy() {
      const filtered_series = this.series.filter(seri => seri.error != 0);
      const absolute_pes = filtered_series.map(seri => seri.absolute_pe).filter(Number);
      const absolute_errors = filtered_series.map(seri => seri.absolute_error);
      const squared_errors = filtered_series.map(seri => seri.error_squared);

      this.mape = mean(absolute_pes).toFixed(2);
      this.mae = mean(absolute_errors).toFixed(2);
      this.mse = mean(squared_errors).toFixed(2);
    },
    // formatNumber(num) {
    //   let comma = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      // comma.replace('.', ",")
      // return comma
    // }
  }
};
</script>
