interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}
interface NutrientMap {
  [nutrient_type: string]: Nutrient;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string;
  dishType: string;
  totalNutrients: NutrientMap;
  totalDaily: NutrientMap;
  //   more attributes here, but they're not needed for our purposes
}
