import express from "express";
import { AuthController } from "@controllers/Auth.controller";
import { AUTH_ROUTES } from "@shared/routes";
import { verifyJwt } from "@middleware/verify-jwt.middleware";

export function AuthRoutes() {
  const router = express.Router(); // create a new router specifically for Auth routes
  router.post(AUTH_ROUTES.LOGIN, AuthController.login);
  router.post(AUTH_ROUTES.SIGNUP, AuthController.signup);
  return router;
}
