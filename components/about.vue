<template>
  <div class="flex flex-col">
    <div class="p-4">
      <h2 class="text-xl font-semibold text-indigo-600">Tentang</h2>
      <span class="text-sm">Fuzzy Time Series COVID-19 model Chen</span>
    </div>
    <div class="flex flex-col p-4 space-y-2">
      <div>
        <h3 class="text-lg font-semibold text-indigo-500">Repository</h3>
        <ol class="ml-5 list-disc">
          <li v-for="link in links" :key="link.name">
            <a
              :href="link.address"
              target="_blank"
              class="inline-flex items-center space-x-1 hover:underline"
            >
              <span>
                {{ link.name }}
              </span>
              <external-link-icon />
            </a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLinkIcon from "@/components/external-link-icon.vue";

export default {
  data() {
    return {
      links: [
        {
          name: "Frontend",
          address: "https://www.github.com/arifikhsan/covid-fts-nuxt/"
        },
        {
          name: "Backend dengan Database",
          address: "https://www.github.com/arifikhsan/covid-fts-rails/"
        },
        {
          name: "Backend scapper",
          address: "https://www.github.com/arifikhsan/covid-fts-next/"
        }
      ]
    };
  },
  components: {
    "external-link-icon": ExternalLinkIcon
  }
};
</script>
