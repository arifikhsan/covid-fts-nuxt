<template>
  <div class="pt-4 pb-16 mx-auto md:max-w-xl lg:max-w-4xl">
    <div class="p-4">
      <h1
        class="text-4xl font-bold leading-tight text-indigo-600 md:text-center"
      >
        Peramalan Kasus Aktif COVID-19 di Indonesia
      </h1>
      <p class="mt-3 md:text-center">
        Metode Fuzzy Time Series Model Chen
      </p>
    </div>
    <div class="lg:flex lg:justify-between">
      <div class="lg:w-2/3">
        <prediction />
      </div>
      <div class="lg:w-1/3">
        <client-only>
          <explanation />
        </client-only>
        <div class="hidden lg:block">
          <about />
        </div>
      </div>
    </div>
    <div class="lg:hidden">
      <about />
    </div>
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
    about: About
  },
  head() {
    return {
      title: "Fuzzy Time Series COVID-19"
    };
  }
};
</script>
