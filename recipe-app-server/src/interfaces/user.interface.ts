import { Grocery } from "./grocery.interfaces";
import { GroceryOrder } from "./grocery-order.interface";
import { Post } from "./post.interface";
import { Recipe } from "./recipe.interface";

export interface IUser {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly avatar: string;
  token: string;
  readonly favorites: Recipe[];
  readonly groceries: Grocery[];
  readonly orders: GroceryOrder[];
  readonly posts: Post[];
}
