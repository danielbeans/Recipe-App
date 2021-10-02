import ILogin from "../interfaces/login.interface";
import ISignup from "../interfaces/signup.interface";
import { UserModel } from "../model/User.model";

export const AuthService = {
  login({ username, password }: ILogin) {
    // query db for username, authenticate by comparing pw hashes
    console.log("Here is where a login should occur.");
  },
  async createUser({ name, username, password, email }: ISignup) {
    try {
      const user = new UserModel({ name, email, username, password });
      await user.save();
      return user;
    } catch (err) {
      console.error(err);
    }
  },
};
