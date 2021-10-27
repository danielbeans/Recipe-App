import axios from "axios";
import config from "../config";
import RecipesResponse from "../interfaces/recipes-response.interface";
export const RecipesService = {
  ENDPOINT: `https://api.edamam.com/api/recipes/v2?app_id=${config.recipes.app_id}&app_key=${config.recipes.app_key}&type=public`,
  _nextPage: "",
  async getRecipes(ingredients: string[]) {
    const data: RecipesResponse = (
      await axios.get(`${this.ENDPOINT}&q=${ingredients.join(",")}`)
    ).data;
    this.nextPage = data._links?.next?.href;
    const recipes = data.hits.map((hit) => hit.recipe);
    return recipes;
  },
  set nextPage(nextPage: string) {
    this._nextPage = nextPage;
  },
};
