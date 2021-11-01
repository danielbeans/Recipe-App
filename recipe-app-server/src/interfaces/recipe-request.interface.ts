import { Session } from "express-session";
import { IRecipeResponse } from "./recipes-response.interface";
import { Request } from "express";

export interface IRecipeRequest extends Request {
  body: { ingredients: string[] };
  session: Session & { currentPage: IRecipeResponse };
}
