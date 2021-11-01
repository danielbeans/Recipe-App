import ISignupForm from "../interfaces/signup.interface";
import ILoginForm from "../interfaces/login.interface";

export interface AuthValidation {
  username: boolean;
  password: boolean;
  validated: boolean;
}

export interface SignupValidation extends AuthValidation {
  name: boolean;
  email: boolean;
  confirmPassword: boolean;
  passwordsMatch: boolean;
  listInvalid: () => Array<[string, boolean]>;
}

export class AuthValidator {
  private static min = {
    password: 8,
    username: 4,
    name: 2,
  };

  private static max = {
    password: 64,
    username: 20,
  };

  private static username(form: ISignupForm | ILoginForm) {
    return (
      form.username.indexOf(" ") <= 0 &&
      form.username.length >= this.min.username &&
      form.username.length <= this.max.username
    );
  }

  private static password(form: ISignupForm | ILoginForm) {
    return (
      form.password.indexOf(" ") <= 0 &&
      form.password.length >= this.min.password &&
      form.password.length <= this.max.password
    );
  }

  private static generateLoginValidation(username: boolean, password: boolean) {
    return {
      username,
      password,
      get validated() {
        return this.username && this.password;
      },
    };
  }

  private static generateSignupValidation(
    form: ISignupForm,
    username: boolean,
    password: boolean
  ): SignupValidation {
    return {
      name: form.name.length >= this.min.name,
      username,
      password,
      email: this.email(form.email),
      confirmPassword:
        form.confirmPassword.length >= this.min.password &&
        form.confirmPassword.length <= this.max.password,
      passwordsMatch: form.confirmPassword === form.password,
      get validated() {
        return (
          this.username &&
          this.password &&
          this.email &&
          this.confirmPassword &&
          this.passwordsMatch
        );
      },
      listInvalid: function () {
        const filtered = Object.entries(this).filter(
          (entry) =>
            !entry[1] &&
            !(entry[0] === "validated" || entry[0] === "passwordsMatch") &&
            entry
        );
        return filtered;
      },
    };
  }

  private static email(email: ISignupForm["email"]) {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email.toLowerCase());
  }

  static validate(
    form: ISignupForm | ILoginForm
  ): AuthValidation | SignupValidation {
    const username = this.username(form);
    const password = this.password(form);
    if ("email" in form) {
      return this.generateSignupValidation(form, username, password);
    }
    return this.generateLoginValidation(username, password);
  }
}
