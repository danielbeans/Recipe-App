import { IGrocery } from "@interfaces/grocery.interfaces";
import { IGroceryOrder } from "@interfaces/grocery-order.interface";
import { IPost } from "@interfaces/post.interface";
import { IRecipe } from "@shared/interfaces/recipe.interface";
import { IPantryItem } from "@shared/interfaces/pantry-item.interface";

export interface IUser {
  readonly _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  jwt?: { token: string; exp: number };
  pantry?: Array<IPantryItem>;
  readonly favorite_recipes?: Array<IRecipe>;
  readonly groceries?: IGrocery[];
  readonly orders?: IGroceryOrder[];
  readonly posts?: IPost[];
}
