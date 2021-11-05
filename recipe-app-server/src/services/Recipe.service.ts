import axios from "axios";
import config from "@config/env";
import { IRecipeRequest } from "@interfaces/recipe-request.interface";
import { IRecipePage } from "@shared/interfaces/recipe-page.interface";
import { IRecipe } from "@shared/interfaces/recipe.interface";
import { decodeJWT } from "@util/token.utility";
import { UserModel } from "@models/User.model";
import { IUser } from "@interfaces/user.interface";

export const RecipeService = {
  RECIPES_FETCH_ERR:
    "Unable to fetch recipes at this time, please try again later",
  NO_RECIPES_FOUND_ERR:
    "No recipes found using the provided query, try simplifying your search and try again.",
  FAVORITE_RECIPE_ERR:
    "Unable to favorite that recipe at this time, please try again later.",
  ENDPOINT: `https://api.edamam.com/api/recipes/v2?app_id=${config.recipes.app_id}&app_key=${config.recipes.app_key}&type=public`,
  async getRecipes(req: IRecipeRequest) {
    try {
      const ingredients = req.body.ingredients; // get ingredients list from client
      const currentPage = req.session.currentPage; // get current page that the user is currently viewing (if any)
      const url =
        ingredients.length <= 0 && currentPage
          ? currentPage._links?.next?.href // if user send a request with no ingredients and a currentPage exists in session (getNextPage), send the next page of recipes.
          : `${this.ENDPOINT}&q=${ingredients.join(",")}`; // Else, get new page of ingredients
      const res = await axios.get(url); // get new page of ingredients
      const data = res.data;
      if (data.hits.length <= 0) throw new Error(this.NO_RECIPES_FOUND_ERR); // if no recipes found for given query, return error to client
      const recipes = data.hits.map((hit) => hit.recipe); // map out recipes from API request
      req.session.currentPage = data; // set the current page for the user session
      return {
        hasNextPage: !!this.checkForNextPage(req.session),
        ingredients,
        recipes,
      } as IRecipePage; // return page of recipes to client
    } catch {
      throw new Error(this.RECIPES_FETCH_ERR);
    }
  },
  async getFavoriteRecipes(token: string) {
    const { user_id } = decodeJWT(token);
    const user = await UserModel.findById(user_id);
    return user.favorite_recipes;
  },
  async favoriteRecipe(recipe: IRecipe, token: string) {
    try {
      const { user_id } = decodeJWT(token);
      const user = await UserModel.findById(user_id);
      if (!recipe.favorited) {
        const indexToRemove = user.favorite_recipes.findIndex(
          (r) => r.uri === recipe.uri
        );
        user.favorite_recipes.splice(indexToRemove, 1);
      } else user.favorite_recipes.push(recipe);
      await user.save();
    } catch {
      throw new Error(this.FAVORITE_RECIPE_ERR);
    }
  },
  checkForNextPage(session: IRecipeRequest["session"]) {
    return session?.currentPage && session.currentPage._links?.next?.href; // checks if current session posesses a current page of recipes
  },
};
