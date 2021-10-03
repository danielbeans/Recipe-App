import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import ISignup from "../interfaces/signup.interface";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { token } = await AuthService.login(req.body); // logs the user
      res.status(201).json({ token }); // on successful login, return jwt
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
  async signup(req: Request, res: Response) {
    try {
      const { token } = await AuthService.createUser(req.body as ISignup); // sign user up
      res.status(201).json(token); // on successful signup, send jwt
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
