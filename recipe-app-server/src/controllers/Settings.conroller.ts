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
      res.status(200).json({ isUpdated });
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
  async updateName(req: Request, res: Response) {
    try {
      const isUpdated = await SettingsService.updateName({
        user_id: req.user.user_id,
        newName: req.body.newName,
      });
      res.status(200).json({ isUpdated });
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
  async updateUsername(req: Request, res: Response) {
    try {
      const isUpdated = await SettingsService.updateUsername({
        user_id: req.user.user_id,
        newUsername: req.body.newUsername,
      });
      res.status(200).json({ isUpdated });
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
  async updateEmail(req: Request, res: Response) {
    try {
      const isUpdated = await SettingsService.updateEmail({
        user_id: req.user.user_id,
        newEmail: req.body.newEmail,
      });
      res.status(200).json({ isUpdated });
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
};
