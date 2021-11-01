import { Request, Response } from "express";
import { IRecipeRequest } from "@interfaces/recipe-request.interface";
import { RecipeService } from "@services/Recipe.service";
import { IRecipe } from "@shared/interfaces/recipe.interface";

export const RecipeController = {
  async getRecipes(req: Request, res: Response) {
    try {
      const data = await RecipeService.getRecipes(req as IRecipeRequest); // gets recipes based on search query
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async getNextPageOfRecipes(req: Request, res: Response) {
    try {
      const data = await RecipeService.getRecipes(req as IRecipeRequest); // gets recipes based on search query
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async getFavoriteRecipes(req: Request, res: Response) {
    try {
      const data = await RecipeService.getFavoriteRecipes(
        req.query.token as string
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async favoriteRecipe(req: Request, res: Response) {
    try {
      const data = await RecipeService.favoriteRecipe(
        req.body.recipe as IRecipe,
        req.body.token
      );
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
