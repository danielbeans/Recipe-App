<template>
  <section class="login-form w-full max-w-xs mx-auto">
    <form @submit="login" class="bg-white shadow-md rounded py-6 px-8 rounded">
      <h3 class="text-lg mb-4">Login</h3>
      <div class="mb-4">
        <label
          class="block text-left font-bold text-sm mb-2 text-gray-600"
          for="username"
          >Username</label
        >
        <input
          id="username"
          placeholder="Username"
          v-model="loginForm.username"
          class="shadow-sm border w-full py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-left font-bold text-sm mb-2 text-gray-600"
          for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="loginForm.password"
          placeholder="Password"
          class="shadow-sm border w-full py-2 px-3 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          required
        />
        <p
          v-show="(!validate.password || !validate.username) && userHasTyped"
          class="text-red-500 text-xs italic"
        >
          Please enter a valid
          <span v-show="!validate.password && !validate.username"
            >username & password.</span
          >
          <span v-show="validate.password && !validate.username">username</span>
          <span v-show="!validate.password && validate.username"
            >password.</span
          >
        </p>
      </div>
      <div class="flex items-center justify-between mb-4">
        <button
          type="submit"
          class="bg-blue-400 text-white py-2 px-4 rounded font-bold hover:bg-blue-300"
        >
          Sign In
        </button>
        <router-link
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-400 align-center"
          to="/forgot"
          >Forgot Password?</router-link
        >
      </div>
      <router-link
        class="text-blue-500 text-xs font-bold hover:text-blue-400"
        to="/signup"
        >Don't have an account, signup here!</router-link
      >
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthValidator } from "../util/validator.util";
import ILoginForm from "./interfaces/login.interface";
import axios from "axios";

@Component({})
export default class LoginForm extends Vue {
  private loginForm: ILoginForm = { username: "", password: "" };
  private error = "";

  get validate() {
    return AuthValidator.validate(this.loginForm);
  }

  get userHasTyped() {
    return (
      this.loginForm.username.length >= 1 || this.loginForm.password.length >= 1
    );
  }

  private async login(e: Event) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        this.loginForm
      );
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>
