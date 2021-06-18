export const state = () => ({
  counter: 0,
  cases: [],
});

export const mutations = {
  increment(state) {
    state.counter++;
  },
  add(state, newCase) {
    state.cases.push(newCase)
  },
  clear(state) {
    state.cases.splice(0)
  }
};
