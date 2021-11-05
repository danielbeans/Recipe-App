import { IRecipe } from "@shared/interfaces/recipe.interface";

interface IRecipeResponseLinkMap {
  [key: string]: { href: string; title?: string };
}
export interface IRecipeResponse {
  from: number;
  to: number;
  count: number;
  _links: IRecipeResponseLinkMap;
  hits: Array<{ recipe: IRecipe; _links: IRecipeResponseLinkMap }>;
}
