import { Request, Response } from "express";
import { IPantryItem } from "@shared/interfaces/pantry-item.interface";
import { PantryService } from "@services/Pantry.service";

export const PantryController = {
  async addToPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.addToPantry(
        req.body.pantryItem as IPantryItem,
        req.body.token
      );
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async editPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.editPantry(
        req.body.pantryItem as IPantryItem,
        req.body.token
      );
      if (data instanceof Error && data.stack && data.message)
        throw new Error(data.message);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async removeFromPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.removeFromPantry(
        req.body.pantryItem as IPantryItem,
        req.body.token
      );
      if (data instanceof Error && data.stack && data.message)
        throw new Error(data.message); // TODO make utility functions for error checking
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: (err as Error).message,
      });
    }
  },
  async getPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.getPantry(req.body.token);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async clearPantry(req: Request, res: Response) {
    try {
      const data = await PantryService.clearPantry(req.body.token);
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
