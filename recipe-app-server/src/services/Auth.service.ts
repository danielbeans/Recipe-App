import { IUser } from "@interfaces/user.interface";
import { UserModel } from "@models/User.model";
import { validatePassword } from "@util/password.utility";
import { ILogin } from "@interfaces/login.interface";
import { ISignup } from "@interfaces/signup.interface";
import jwt from "jsonwebtoken";
import { decodeJWT } from "../util/token.utility";
import config from "@config/env";

export const AuthService = {
  EXPIRATION: config.node_env.isDevelopment ? "365d" : "2h",
  async login({ username, password }: ILogin) {
    ``;
    const user: IUser = await UserModel.findOne({ username }); // find user with matching username in db
    // if user exists and passwords match
    if (user && (await validatePassword(password, user.password))) {
      const token = this.signToken(user, username); // sign new token
      const { exp } = decodeJWT(token); // get expiration time for token
      user.password = undefined; // remove password hash from user object before sending to client
      const { _id, name, email, avatar } = user;
      return {
        _id,
        name,
        username,
        email,
        avatar,
        jwt: {
          token,
          exp,
        },
      };
    }
    throw new Error("Username and/or password combination incorrect");
  },
  async createUser({ name, username, password, email }: ISignup) {
    const hasDuplicate = await this.checkDuplicateEmailOrUsername(
      email,
      username
    ); // check if user with existing username or email exists
    if (hasDuplicate) throw hasDuplicate; // if already existing user with username/email exists, throw error
    email = email.toLowerCase();
    const user: IUser = await UserModel.create({
      name,
      email,
      username,
      password,
    }); // create new user with given credentials
    const token = this.signToken(user, email); // sign new token for user
    const { exp } = decodeJWT(token) as JwtPayload; // get expiration time for token
    user.jwt = { token, exp }; // set token on user object for future API requests
    user.password = undefined; // remove password hash from user object before sending to client
    const { _id, avatar } = user;
    return {
      _id,
      name,
      username,
      email,
      avatar,
      jwt: {
        token,
        exp,
      },
    };
  },
  // check if user with email or username already exists in db
  async checkDuplicateEmailOrUsername(email: string, username: string) {
    const exists = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (exists && exists.username === username && exists.email === email)
      return new Error("User with username and email already exists.");
    else if (exists && exists.email === email)
      return new Error("User with email already exists.");
    else if (exists && exists.username === username)
      return new Error("User with username already exists.");
    return false;
  },
  // sign new JWT
  signToken(user: IUser, username: string) {
    return jwt.sign({ user_id: user._id, username }, config.auth.secret, {
      expiresIn: this.EXPIRATION,
    });
  },
};
