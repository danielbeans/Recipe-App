import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { AuthModule } from "./auth.module";
import { PantryModule } from "./pantry.module";
import { RecipeModule } from "./recipe.module";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "vuex",
});

export default new Vuex.Store({
  modules: { AuthModule, PantryModule, RecipeModule },
  plugins: [vuexLocal.plugin],
});
