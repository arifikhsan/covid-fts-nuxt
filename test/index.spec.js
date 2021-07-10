import { get, setupTest } from "@nuxt/test-utils";

describe("Index page", () => {
  setupTest({
    server: true,
    setupTimeout: 15 * 60 * 1000
  });

  test("it contain correct titles", async () => {
    const { body } = await get("/");

    expect(body).toContain("Peramalan Kasus Aktif COVID-19 di Indonesia");
    expect(body).toContain("Grafik Prediksi");
    expect(body).toContain("Hasil Prediksi");
  });
});
