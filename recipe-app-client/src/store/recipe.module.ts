import { GetterTree, MutationTree, ActionTree } from "vuex";
import axios from "axios";
import { IRecipe } from "@shared/interfaces/recipe.interface";
import { RECIPE_ROUTES } from "@shared/routes";

enum MutationTypes {
  SET_FAVORITE_RECIPES = "SET_FAVORITED_RECIPES",
  FAVORITE_RECIPE = "FAVORITE_RECIPE",
}

class RecipeState {
  favoriteRecipes: IRecipe[] = [];
}

const mutations = <MutationTree<RecipeState>>{
  [MutationTypes.SET_FAVORITE_RECIPES](state: RecipeState, recipes: IRecipe[]) {
    state.favoriteRecipes = recipes;
  },
  [MutationTypes.FAVORITE_RECIPE](state: RecipeState, recipe: IRecipe) {
    if (!recipe.favorited) {
      const indexToRemove = state.favoriteRecipes.findIndex(
        (r) => r.uri === recipe.uri
      );
      state.favoriteRecipes.splice(indexToRemove, 1);
    } else state.favoriteRecipes.push(recipe);
  },
};

const actions = <ActionTree<RecipeState, any>>{
  async setFavoriteRecipes({ commit, rootState }) {
    try {
      const res = await axios.get(
        RECIPE_ROUTES.BASE +
          RECIPE_ROUTES.FAVORITES +
          `?token=${rootState.AuthModule.user.jwt.token}`
      );
      commit(MutationTypes.SET_FAVORITE_RECIPES, res.data);
    } catch (err) {
      console.error(err); // TODO display alert error to client if favorite does not work
    }
  },
  async favoriteRecipe({ commit, rootState }, recipe: IRecipe) {
    try {
      await axios.post(RECIPE_ROUTES.BASE + RECIPE_ROUTES.FAVORITE, {
        recipe,
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.FAVORITE_RECIPE, recipe);
    } catch (err) {
      console.error(err); // TODO display alert error to client if favorite does not work
    }
  },
};

const getters = <GetterTree<RecipeState, any>>{
  getFavoriteRecipes(state: RecipeState) {
    return state.favoriteRecipes;
  },
};

export const RecipeModule = {
  state: new RecipeState(),
  mutations,
  actions,
  getters,
  namespaced: true,
};
