import { get, setupTest } from "@nuxt/test-utils";

describe("About page", () => {
  setupTest({
    server: true,
    setupTimeout: 5 * 60 * 1000
  });

  test("it contain about", async () => {
    const { body } = await get('/about')

    expect(body).toContain('about')
  });
});

