import config from "@config/env";
import jwt from "jsonwebtoken";

export function decodeJWT(token: string): JwtPayload {
  return jwt.verify(token, config.auth.secret) as JwtPayload;
}
