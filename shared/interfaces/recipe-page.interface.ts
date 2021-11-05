import { IRecipe } from "./recipe.interface";

export interface IRecipePage {
  hasNextPage: boolean;
  ingredients: string[];
  recipes: IRecipe[];
}
