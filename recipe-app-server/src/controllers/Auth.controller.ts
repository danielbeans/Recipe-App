import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";

// PARSING DATA FROM CLIENT AND PASSING TO SERVICE
export const AuthController = {
  login(req: Request, res: Response) {
    AuthService.login(req.body);
  },
  signup(req: Request, res: Response) {
    AuthService.signup(req.body);
  },
};
