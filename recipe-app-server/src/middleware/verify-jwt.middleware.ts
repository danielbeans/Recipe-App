import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

// verifies the JWT passed into a given route.
export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) return res.status(403).send({ error: "No token provided" });
  try {
    const decoded = jwt.verify(token, config.auth.secret) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ error: "Token is invalid" });
  }
  next();
};
