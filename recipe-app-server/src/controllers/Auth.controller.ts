import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";
import ISignup from "../interfaces/signup.interface";
import ILogin from "../interfaces/login.interface";

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const user = await AuthService.login(req.body as ILogin); // logs the user
      res.status(200).json({ user }); // on successful login, return jwt
    } catch (err) {
      res.status(401).send({ error: (err as Error).message });
    }
  },
  async signup(req: Request, res: Response) {
    try {
      const user = await AuthService.createUser(req.body as ISignup); // sign user up
      res.status(201).json({ user }); // on successful signup, send jwt
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  },
};
