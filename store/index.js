export const state = () => ({
  counter: 0,
  series: [],

  dMin: 0,
  dMax: 0,
  intervalCount: 0,
  intervalLength: 0,
  intervals: [],
  groups: [],
  forecasts: [],
  finalMape: 0
});

export const getters = {
  getSeries: (state) => state.series
}

export const mutations = {
  increment(state) {
    state.counter++;
  },
  addSeries(state, series) {
    state.series.splice(0);
    series.forEach(item => {
      state.series.push(item);
    })
  },
  clearSeries(state) {
    state.series.splice(0);
  },
  insertDMin(state, value) {
    state.dMin = value
  },
  insertDMax(state, value) {
    state.dMax = value
  },
  insertIntervalCount(state, value) {
    state.intervalCount = value
  },
  insertIntervalLength(state, value) {
    state.intervalLength = value
  },
  addIntervals(state, intervals) {
    state.intervals.splice(0);
    intervals.forEach(interval => {
      state.intervals.push(interval);
    })
  },
  addGroups(state, groups) {
    state.groups.splice(0);
    groups.forEach(group => {
      state.groups.push(group);
    })
  },
  addForecasts(state, forecasts) {
    state.forecasts.splice(0);
    forecasts.forEach(forecast => {
      state.forecasts.push(forecast);
    })
  },
  insertFinalMape(state, value) {
    state.finalMape = value
  },
};
