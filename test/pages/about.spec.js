import { get, setupTest } from "@nuxt/test-utils";

describe("About page", () => {
  setupTest({
    server: true,
    setupTimeout: 5 * 60 * 1000
  });

  it("contains about", async () => {
    const { body } = await get('/about')

    expect(body).toContain('about')
  });
});

