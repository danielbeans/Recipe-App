import { IGrocery } from "@interfaces/grocery.interfaces";
import { IGroceryOrder } from "@interfaces/grocery-order.interface";
import { IPost } from "@interfaces/post.interface";
import { IRecipe } from "@shared/interfaces/recipe.interface";
import mongoose from "mongoose";
export interface IUser extends mongoose.Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  password: string;
  avatar: string;
  jwt?: { token: string; exp: number };
  readonly favorites?: IRecipe[];
  readonly groceries?: IGrocery[];
  readonly orders?: IGroceryOrder[];
  readonly posts?: IPost[];
}
