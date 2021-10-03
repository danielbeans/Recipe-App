import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  export interface JwtPayload {
    user_id: string;
    email: string;
  }
  declare namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
