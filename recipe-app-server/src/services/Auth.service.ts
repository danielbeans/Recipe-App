import { IUser } from "@interfaces/user.interface";
import { UserModel } from "@models/User.model";
import { validatePassword } from "@util/password.utility";
import { ILogin } from "@interfaces/login.interface";
import { ISignup } from "@interfaces/signup.interface";
import config from "@config/env";
import jwt from "jsonwebtoken";

export const AuthService = {
  EXPIRATION: "2h",
  async login({ username, password }: ILogin) {
    const user: IUser = await UserModel.findOne({ username });
    if (user && (await validatePassword(password, user.password))) {
      const token = this.signToken(user, username);
      user.token = token;
      delete user.password;
      return user;
    }
    throw new Error("Username and/or password combination incorrect");
  },
  async createUser({ name, username, password, email }: ISignup) {
    const hasDuplicate = await this.checkDuplicateEmailOrUsername(
      email,
      username
    );
    if (hasDuplicate) throw hasDuplicate;
    email = email.toLowerCase();
    console.log(email);
    const user: IUser = await UserModel.create({
      name,
      email,
      username,
      password,
    });
    const token = this.signToken(user, email);
    user.token = token;
    delete user.password;
    return user;
  },

  async checkDuplicateEmailOrUsername(email: string, username: string) {
    // check if user with email or username already exists in db
    const exists = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (exists && exists.username === username && exists.email === email)
      return new Error("User with username and email already exists.");
    else if (exists && exists.email === email)
      return new Error("User with email already exists.");
    else if (exists && exists.username === username)
      return new Error("User with username already exists.");
    return false;
  },

  signToken(user: IUser, username: string) {
    return jwt.sign({ user_id: user._id, username }, config.auth.secret, {
      expiresIn: this.EXPIRATION,
    });
  },
};
