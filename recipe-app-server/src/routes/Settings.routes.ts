import express from "express";
import { SETTINGS_ROUTES } from "@shared/routes";
import { SettingsController } from "@controllers/Setings.conroller";
import { verifyJwt } from "@middleware/verify-jwt.middleware";

export function SettingsRoutes() {
  const router = express.Router(); // create a new router specifically for Auth routes
  router.post(
    SETTINGS_ROUTES.DELETE,
    verifyJwt,
    SettingsController.deleteAccount
  );
  return router;
}
