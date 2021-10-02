import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import ISignup from "../interfaces/signup.interface";

export const AuthController = {
  login(req: Request, res: Response) {
    AuthService.login(req.body);
  },
  async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.createUser(req.body as ISignup);
      console.log(user);
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Unable to create user." });
    }
  },
};
