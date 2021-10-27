import { Recipe } from "./recipe.interface";

interface RecipesResponseLinks {
  next: { href: string; title?: string };
}
export default interface RecipesResponse {
  from: number;
  to: number;
  count: 25;
  _links: RecipesResponseLinks;
  hits: Array<{ recipe: Recipe; _links: RecipesResponse }>;
}
