import { Request, Response } from "express";
import { IPantryItem } from "@shared/interfaces/pantry.interface";
import { PantryService } from "@services/Pantry.service";

export const PantryController = {
  async updatePantry(req: Request, res: Response) {
    try {
      const data = await PantryService.updatePantry(
        req.body.pantry as IPantryItem[],
        req.body.token
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },

  async searchPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.getPantry(req.body.token);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
