import { Request, Response } from "express";
import { RecipesService } from "../services/Recipes.service";

export const RecipesController = {
  async getRecipes(req: Request, res: Response) {
    try {
      const recipes = await RecipesService.getRecipes(req.body.ingredients); // gets recipes based on search query
      res.status(200).json({ recipes });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
