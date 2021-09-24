import { Grocery } from "./grocery.interfaces";
import { GroceryOrder } from "./grocery-order.interface";
import { Post } from "./post.interface";
import { Recipe } from "./recipe.interface";

export interface User {
  readonly id: string;
  readonly avatar: string;
  readonly name: string;
  readonly favorites: Recipe[];
  readonly groceries: Grocery[];
  readonly orders: GroceryOrder[];
  readonly posts: Post[];
}
