import express from "express";
import { RecipeController } from "../controllers/Recipe.controller";
import { verifyJwt } from "../middleware/verify-jwt.middleware";

export function RecipeRoutes() {
  const router = express.Router();
  router.post("/search", verifyJwt, RecipeController.getRecipes);
  router.post("/next", verifyJwt, RecipeController.getNextPageOfRecipes);
  return router;
}
