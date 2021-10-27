import express from "express";
import { RecipesController } from "../controllers/Recipes.controller";

export function RecipesRoutes() {
  const router = express.Router(); // create a new router specifically for Auth routes
  router.post("/search", RecipesController.getRecipes);
  return router;
}
