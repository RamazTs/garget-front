import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const sessionStorageState = createPersistedState({
  paths: ["auth"],
  storage: window.sessionStorage
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
  plugins: [sessionStorageState]
});
