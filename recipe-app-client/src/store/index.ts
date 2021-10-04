import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { AuthModule } from "./auth.module";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "vuex",
});

export default new Vuex.Store({
  modules: { AuthModule },
  plugins: [vuexLocal.plugin],
});
