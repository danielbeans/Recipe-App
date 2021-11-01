import { IGrocery } from "@interfaces/grocery.interfaces";
import { IGroceryOrder } from "@interfaces/grocery-order.interface";
import { IPost } from "@interfaces/post.interface";
import { IRecipe } from "@shared/interfaces/recipe.interface";

export interface IUser {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  password: string;
  readonly avatar: string;
  token: string;
  readonly favorites?: IRecipe[];
  readonly groceries?: IGrocery[];
  readonly orders?: IGroceryOrder[];
  readonly posts?: IPost[];
}
