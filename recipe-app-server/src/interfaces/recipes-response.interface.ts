import { Recipe } from "./recipe.interface";

interface RecipeResponseLinkMap {
  [key: string]: { href: string; title?: string };
}
export default interface RecipeResponse {
  from: number;
  to: number;
  count: number;
  _links: RecipeResponseLinkMap;
  hits: Array<{ recipe: Recipe; _links: RecipeResponseLinkMap }>;
}
