import { Request, Response } from "express";
import { RecipeRequest } from "../interfaces/recipe-request.interface";
import { RecipeService } from "../services/Recipe.service";

export const RecipeController = {
  async getRecipes(req: Request, res: Response) {
    try {
      const data = await RecipeService.getRecipes(req as RecipeRequest); // gets recipes based on search query
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async getNextPageOfRecipes(req: Request, res: Response) {
    try {
      const data = await RecipeService.getRecipes(req as RecipeRequest); // gets recipes based on search query
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
