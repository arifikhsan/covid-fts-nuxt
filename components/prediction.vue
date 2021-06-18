<template>
  <div class="flex flex-col p-4 space-y-4">
    <div>
      <h2 class="text-xl font-semibold text-indigo-600">Grafik Prediksi</h2>
      <span class="text-sm">Tanggal: {{ now }}</span>
    </div>
    <div class="">
      <div class="flex items-center justify-center h-64 border border-indigo-400">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    now() {
      return new Date().toDateString();
    }
  }
};
</script>
