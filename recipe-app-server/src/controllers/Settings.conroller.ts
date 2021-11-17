import { SettingsService } from "@services/Settings.service";
import { Request, Response } from "express";

export const SettingsController = {
  async deleteAccount(req: Request, res: Response) {
    try {
      const isDeleted = await SettingsService.deleteAccount(req.user);
      res.status(200).json({ isDeleted }); // on successful login, return jwt
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
  async updatePassword(req: Request, res: Response) {
    try {
      const isUpdated = await SettingsService.updatePassword({
        user_id: req.user.user_id,
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
      });
      res.status(200).json({ isUpdated }); // on successful login, return jwt
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
};
