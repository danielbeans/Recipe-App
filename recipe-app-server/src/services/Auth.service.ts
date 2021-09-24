import ILogin from "../interfaces/login.interface";
import ISignup from "../interfaces/signup.interface";

// LOGIC GOES IN SERVICE (DB INTERACTIONS, API INTERACTIONS, ETC.)
export const AuthService = {
  login({ username, password }: ILogin) {
    // query db for username, authenticate by conparing hashes
  },
  signup({ name, username, password, email }: ISignup) {
    // create new doucment in DB with user.model.ts (also can do authentication to login the user automatically by calling login)
  },
};
