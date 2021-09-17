<template>
  <div class="login-form max-w-xl mx-auto text-left">
    <form
      @submit="signup"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 class="text-xl mb-4 text-gray-600 text-center">Sign up</h3>
      <div class="mb-4 flex">
        <div class="w-full mr-5">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            v-model="signupForm.name"
            required
            class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': !validate.name && userHasTyped }"
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="w-full">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Username*</label
          >
          <input
            v-model="signupForm.username"
            required
            class="shadow appearance-none border rounded py-2 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': !validate.username && userHasTyped }"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
      <div class="mb-4 flex">
        <div class="w-full mr-5">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Password*</label
          >
          <input
            v-model="signupForm.password"
            required
            class="shadow appearance-none border rounded py-2 px-3 w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{
              'border-red-500':
                (!validate.password && userHasTyped) ||
                !validate.passwordsMatch,
            }"
            type="password"
            placeholder="********"
          />
        </div>
        <div class="w-full">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm Password*</label
          >
          <input
            v-model="signupForm.confirmPassword"
            required
            class="shadow appearance-none border rounded py-2 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{
              'border-red-500':
                (!validate.confirmPassword && userHasTyped) ||
                !validate.passwordsMatch,
            }"
            type="password"
            placeholder="********"
          />
        </div>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          v-model="signupForm.email"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': !validate.email && userHasTyped }"
          type="email"
          placeholder="example@email.com"
        />
        <p
          v-show="!validate.validated && userHasTyped"
          class="text-red-500 text-xs italic"
        >
          Please enter a valid
          <span
            v-for="(invalid, index) in validate.listInvalid()"
            :key="invalid[0] + index"
          >
            <span
              v-if="
                index === validate.listInvalid().length - 1 &&
                  validate.listInvalid().length !== 1
              "
              >&
              {{
                invalid[0] === "confirmPassword"
                  ? "password confirmation"
                  : invalid[0]
              }}</span
            >
            <span v-else-if="validate.listInvalid().length !== 1"
              >{{
                invalid[0] === "confirmPassword"
                  ? "password confirmation"
                  : invalid[0]
              }}, &nbsp;</span
            >
            <span v-else
              >{{
                invalid[0] === "confirmPassword"
                  ? "password confirmation"
                  : invalid[0]
              }}
              &nbsp;</span
            >
          </span>
        </p>
        <p
          v-show="!validate.passwordsMatch && userHasTyped"
          class="text-red-500 text-xs italic"
        >
          The passwords you have entered do not match, please recheck and try
          again
        </p>
        <p class="text-xs italic mb-1">
          * Your username must be consist of at least 4 alpha-numeric
          characters. Spaces are not permitted
        </p>
        <p class="text-xs italic">
          * Your password must consist of at least 8 alpha-numeric characters.
          Spaces are not permitted
        </p>
      </div>

      <div class="flex items-center flex-wrap justify-between">
        <button
          class="bg-blue-500 w-full hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
        <router-link
          class="w-full text-center mt-3 align-baseline font-bold text-xs text-blue-500 hover:text-blue-400"
          to="/login"
          >Already have an account? Login here</router-link
        >
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ISignupForm from "./interfaces/signup.interface";
import { AuthValidator } from "../util/validator.util";
import axios from "axios";

@Component({})
export default class SignupForm extends Vue {
  private signupForm: ISignupForm = {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  get validate() {
    return AuthValidator.validate(this.signupForm);
  }

  get userHasTyped() {
    return (
      this.signupForm.username.length >= 1 ||
      this.signupForm.password.length >= 1 ||
      this.signupForm.confirmPassword.length >= 1 ||
      this.signupForm.email.length >= 1 ||
      this.signupForm.name.length >= 1
    );
  }

  private async signup(event: Event) {
    try {
      event.preventDefault();
      if (this.validate.validated) {
        event.preventDefault();
        const res = await axios.post(
          "http://localhost:3000/signup",
          this.signupForm
        );
        console.log(res);
        return res;
      }
    } catch (err) {
      return new Error("Unable to create user account");
    }
  }
}
</script>
