import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import session, { Session } from "express-session";
declare global {
  export interface JwtPayload {
    user_id: string;
    email: string;
    exp: number;
  }
  declare namespace Express {
    export interface Request {
      session: Session;
      user?: JwtPayload;
    }
  }
}
