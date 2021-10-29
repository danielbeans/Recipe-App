import { Session } from "express-session";
import RecipeResponse from "./recipes-response.interface";
import { Request } from "express";

export interface RecipeRequest extends Request {
  body: { ingredients: string[] };
  session: Session & { currentPage: RecipeResponse };
}
