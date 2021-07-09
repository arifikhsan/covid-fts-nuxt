# Archive

## Constant Series

```js
    async getSeries() {
      this.series = [
        { name: "1-Jan", dirawat_kumulatif: 111005 },
        { name: "2-Jan", dirawat_kumulatif: 110400 },
        { name: "3-Jan", dirawat_kumulatif: 110679 },
        { name: "4-Jan", dirawat_kumulatif: 110089 },
        { name: "5-Jan", dirawat_kumulatif: 110693 },
        { name: "6-Jan", dirawat_kumulatif: 112593 },
        { name: "7-Jan", dirawat_kumulatif: 114766 },
        { name: "8-Jan", dirawat_kumulatif: 117704 },
        { name: "9-Jan", dirawat_kumulatif: 120928 },
        { name: "10-Jan", dirawat_kumulatif: 122873 },
        { name: "11-Jan", dirawat_kumulatif: 123636 },
        { name: "12-Jan", dirawat_kumulatif: 126313 },
        { name: "13-Jan", dirawat_kumulatif: 129628 },
        { name: "14-Jan", dirawat_kumulatif: 133149 },
        { name: "15-Jan", dirawat_kumulatif: 138238 },
        { name: "16-Jan", dirawat_kumulatif: 143517 },
        { name: "17-Jan", dirawat_kumulatif: 145482 },
        { name: "18-Jan", dirawat_kumulatif: 144798 },
        { name: "19-Jan", dirawat_kumulatif: 146842 },
        { name: "20-Jan", dirawat_kumulatif: 149388 },
        { name: "21-Jan", dirawat_kumulatif: 151658 },
        { name: "22-Jan", dirawat_kumulatif: 156683 },
        { name: "23-Jan", dirawat_kumulatif: 158751 },
        { name: "24-Jan", dirawat_kumulatif: 162617 },
        { name: "25-Jan", dirawat_kumulatif: 161636 },
        { name: "26-Jan", dirawat_kumulatif: 163526 },
        { name: "27-Jan", dirawat_kumulatif: 164113 },
        { name: "28-Jan", dirawat_kumulatif: 166540 },
        { name: "29-Jan", dirawat_kumulatif: 170017 },
        { name: "30-Jan", dirawat_kumulatif: 174083 },
        { name: "31-Jan", dirawat_kumulatif: 175095 },
        { name: "1-Feb", dirawat_kumulatif: 175349 },
        { name: "2-Feb", dirawat_kumulatif: 172576 },
        { name: "3-Feb", dirawat_kumulatif: 175236 },
        { name: "4-Feb", dirawat_kumulatif: 174798 },
        { name: "5-Feb", dirawat_kumulatif: 176672 }
      ];
    },
```

## Hasil prediksi
```html
    <div v-show="false" class="px-4 pt-4">
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
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          1. Tabel Dataset
        </p>
        <table
          class="w-full mt-2 border border-collapse border-indigo-800 table-auto min-w-max"
        >
          <thead>
            <tr class="text-indigo-600 bg-indigo-200">
              <th class="border border-indigo-600">No</th>
              <th class="border border-indigo-600">Tanggal</th>
              <th class="border border-indigo-600">Kasus Aktif</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr
              v-for="(item, index) in series"
              :key="item.id"
              class="even:bg-indigo-100"
            >
              <td class="border border-indigo-600">{{ index + 1 }}</td>
              <td class="border border-indigo-600">{{ item.label }}</td>
              <td class="border border-indigo-600">
                {{ item.active_cumulative }}
              </td>
            </tr>
          </tbody>
        </table>
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          2. Tabel Dataset
        </p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          3. Tabel Dataset
        </p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          4. Tabel Dataset
        </p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          5. Tabel Dataset
        </p>
        <p class="mt-4 text-lg font-semibold text-indigo-500">
          6. Tabel Dataset
        </p>
      </div>
    </transition>
```
