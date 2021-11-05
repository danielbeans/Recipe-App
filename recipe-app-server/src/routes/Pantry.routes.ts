import express from "express";
import { verifyJwt } from "@middleware/verify-jwt.middleware";
import { PANTRY_ROUTES } from "@shared/routes";
import { PantryController } from "@controllers/Pantry.controller";

export function PantryRoutes() {
  const router = express.Router();
  router.post(PANTRY_ROUTES.UPDATE, verifyJwt, PantryController.updatePantry);
  router.post(PANTRY_ROUTES.GET, verifyJwt, PantryController.searchPantry);
  return router;
}
