import { createStore } from "vuex";

export default createStore({
  state: {
    selectMBTI: "",
    events: [],
  },
  getters: {
    EVENTS: (state) => state.events,
  },
  mutations: {
    ADD_EVENT: (state, event) => {
      state.events.push(event);
    },
  },
  actions: {},
  modules: {},
});
