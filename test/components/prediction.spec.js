describe("call api from backend", () => {
    setupTest({
    server: true,
    setupTimeout: 5 * 60 * 1000
    });

  it("add", () => {
    expect(1 + 1).toBe(2);
  });
});
