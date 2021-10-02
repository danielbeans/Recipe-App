import express from "express";
import { AuthController } from "../controllers/Auth.controller";

export function AuthRoutes() {
  const router = express.Router(); // create a new router specifically for Auth routes
  router.post("/login", AuthController.login);
  router.post("/signup", AuthController.signup);
  return router;
}
