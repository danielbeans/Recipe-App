import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../model/User.model";
import { validatePassword } from "../util/password.utility";
import ILogin from "../interfaces/login.interface";
import ISignup from "../interfaces/signup.interface";
import config from "../config";
import jwt from "jsonwebtoken";

export const AuthService = {
  EXPIRATION: "2h",
  async login({ email, password }: ILogin) {
    const user: IUser = await UserModel.findOne({ email });
    if (user && (await validatePassword(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, config.auth.secret, {
        expiresIn: this.EXPIRATION,
      });
      user.token = token;
      return user;
    }
    throw new Error("Username and/or password combination incorrect");
  },
  async createUser({ name, username, password, email }: ISignup) {
    const exists = await UserModel.findOne({ $or: [{ username }, { email }] }); // check if user with email or username already exists in db
    if (exists && exists.username === username && exists.email === email)
      throw new Error("User with username and email already exists.");
    else if (exists && exists.email === email)
      throw new Error("User with email already exists.");
    else if (exists && exists.username === username)
      throw new Error("User with username already exists.");
    email = email.toLowerCase();
    const user: IUser = await UserModel.create({
      name,
      email,
      username,
      password,
    });
    const token = jwt.sign({ user_id: user._id, email }, config.auth.secret, {
      expiresIn: this.EXPIRATION,
    });
    user.token = token;
    return user;
  },
};
