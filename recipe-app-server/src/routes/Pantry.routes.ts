import express from "express";
import { verifyJwt } from "@middleware/verify-jwt.middleware";
import { PANTRY_ROUTES } from "@shared/routes";
import { PantryController } from "@controllers/Pantry.controller";

export function PantryRoutes() {
  const router = express.Router();
  router.post(PANTRY_ROUTES.ADD, verifyJwt, PantryController.addToPantry);
  router.post(PANTRY_ROUTES.EDIT, verifyJwt, PantryController.editPantry);
  router.post(
    PANTRY_ROUTES.REMOVE,
    verifyJwt,
    PantryController.removeFromPantry
  );
  router.post(PANTRY_ROUTES.GET, verifyJwt, PantryController.getPantry);
  router.post(PANTRY_ROUTES.CLEAR, verifyJwt, PantryController.clearPantry);
  return router;
}
