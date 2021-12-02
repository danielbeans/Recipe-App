import express from "express";
import { SETTINGS_ROUTES } from "@shared/routes";
import { SettingsController } from "@controllers/Settings.conroller";
import { verifyJwt } from "@middleware/verify-jwt.middleware";

export function SettingsRoutes() {
  const router = express.Router(); // create a new router specifically for Auth routes
  router.post(
    SETTINGS_ROUTES.DELETE,
    verifyJwt,
    SettingsController.deleteAccount
  );
  router.post(
    SETTINGS_ROUTES.UPDATE_PASSWORD,
    verifyJwt,
    SettingsController.updatePassword
  );
  router.post(
    SETTINGS_ROUTES.UPDATE_NAME,
    verifyJwt,
    SettingsController.updateName
  );
  router.post(
    SETTINGS_ROUTES.UPDATE_USERNAME,
    verifyJwt,
    SettingsController.updateUsername
  );
  router.post(
    SETTINGS_ROUTES.UPDATE_EMAIL,
    verifyJwt,
    SettingsController.updateEmail
  );
  return router;
}
