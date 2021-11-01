interface IIngredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

interface INutrient {
  label: string;
  quantity: number;
  unit: string;
}
interface INutrientMap {
  [nutrient_type: string]: INutrient;
}

export interface IRecipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  favorited: boolean;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: IIngredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string;
  dishType: string;
  totalNutrients: INutrientMap;
  totalDaily: INutrientMap;
  //   more attributes here, but they're not needed for our purposes
}
