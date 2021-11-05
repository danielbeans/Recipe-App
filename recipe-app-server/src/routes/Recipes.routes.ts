import express from "express";
import { RecipeController } from "@controllers/Recipe.controller";
import { verifyJwt } from "@middleware/verify-jwt.middleware";
import { RECIPE_ROUTES } from "@shared/routes";

export function RecipeRoutes() {
  const router = express.Router();
  router.post(RECIPE_ROUTES.SEARCH, verifyJwt, RecipeController.getRecipes);
  router.post(
    RECIPE_ROUTES.NEXT_PAGE,
    verifyJwt,
    RecipeController.getNextPageOfRecipes
  );
  router.post(
    RECIPE_ROUTES.FAVORITE,
    verifyJwt,
    RecipeController.favoriteRecipe
  );
  router.get(
    RECIPE_ROUTES.FAVORITES,
    verifyJwt,
    RecipeController.getFavoriteRecipes
  );
  return router;
}
