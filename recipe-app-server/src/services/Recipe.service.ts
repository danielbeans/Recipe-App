import axios from "axios";
import config from "../config";
import { HTTPStatus } from "../enum/http-status.enum";
import { RecipeRequest } from "../interfaces/recipe-request.interface";

export const RecipeService = {
  RECIPES_FETCH_ERR:
    "Unable to fetch recipes at this time, please try again at a later time",
  NO_RECIPES_FOUND_ERR: "No recipes found using the provided query",
  ENDPOINT: `https://api.edamam.com/api/recipes/v2?app_id=${config.recipes.app_id}&app_key=${config.recipes.app_key}&type=public`,
  async getRecipes(req: RecipeRequest) {
    const ingredients = req.body.ingredients;
    const currentPage = req.session.currentPage;
    const url =
      ingredients.length <= 0 && currentPage
        ? currentPage._links?.next?.href
        : `${this.ENDPOINT}&q=${ingredients.join(",")}`;
    const res = await axios.get(url);
    if (res.status !== HTTPStatus.OK) throw new Error(this.RECIPES_FETCH_ERR);
    const data = res.data;
    if (data.hits.length <= 0) throw new Error(this.NO_RECIPES_FOUND_ERR);
    const recipes = data.hits.map((hit) => hit.recipe);
    req.session.currentPage = data;
    return {
      hasNextPage: !!this.checkForNextPage(req.session),
      ingredients,
      recipes,
    };
  },
  checkForNextPage(session: RecipeRequest["session"]) {
    return session?.currentPage && session.currentPage._links?.next?.href;
  },
};
