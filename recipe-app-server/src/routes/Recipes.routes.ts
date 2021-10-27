import express from "express";
import { RecipesController } from "../controllers/Recipes.controller";

export function RecipesRoutes() {
  const router = express.Router();
  router.post("/search", RecipesController.getRecipes);
  return router;
}
