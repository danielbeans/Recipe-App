<template>
  <section
    class="
      login-form
      w-full
      md:max-w-xl
      mx-auto
      text-left
      mt-5
      absolute
      top-1/2
      left-1/2
      transform
      -translate-x-1/2 -translate-y-1/2
    "
  >
    <form
      class="bg-white md:shadow-md md:px-10 rounded pt-10 pb-5 mx-10"
      @submit="login"
    >
      <h3 class="text-xl mb-4 text-gray-600 text-center">Login</h3>
      <div class="mb-4">
        <label class="block font-bold text-sm mb-2 text-gray-700" for="username"
          >Username</label
        >
        <input
          id="username"
          v-model="loginForm.username"
          placeholder="Username"
          class="
            shadow-sm
            border
            w-full
            py-2
            px-3
            rounded
            text-gray-700
            leading-tight
            focus:outline-none focus:shadow-outline
          "
          :class="{ 'border-red-500': !validate.username && userHasTyped }"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block font-bold text-sm mb-2 text-gray-700" for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="loginForm.password"
          placeholder="Password"
          class="
            shadow-sm
            border
            w-full
            py-2
            px-3
            rounded
            text-gray-700
            leading-tight
            mb-2
            focus:outline-none focus:shadow-outline
          "
          :class="{ 'border-red-500': !validate.password && userHasTyped }"
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
      <div class="flex items-center flex-wrap justify-between">
        <button
          type="submit"
          class="
            bg-red-500
            text-white
            w-full
            py-2
            px-4
            rounded
            font-bold
            hover:bg-red-400
          "
        >
          Log In
        </button>
        <router-link
          class="
            inline-block
            text-center
            align-baseline
            mt-3
            font-bold
            text-sm text-red-500
            hover:text-red-400
            align-center
            w-full
          "
          to="/forgot"
        >
          Forgot Password?
        </router-link>
        <router-link
          class="
            w-full
            text-center
            mt-3
            align-baseline
            font-bold
            text-xs text-red-500
            hover:text-red-400
          "
          to="/signup"
        >
          Don't have an account, signup here!
        </router-link>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import {
  AuthValidation,
  AuthValidator,
  SignupValidation,
} from "../helpers/validator";
import { IUser } from "../interfaces/user.interface";
import ILoginForm from "../interfaces/login.interface";
import axios from "axios";
import { mapActions } from "vuex";
import { AUTH_ROUTES } from "@shared/routes";

export default Vue.extend({
  name: "LoginForm",
  data() {
    return {
      loginForm: { username: "", password: "" } as ILoginForm,
      error: "",
    };
  },
  methods: {
    ...mapActions({
      setUser: "AuthModule/setUser",
      setModalDisplay: "AuthModule/setModalDisplay",
      setFavoriteRecipes: "RecipeModule/setFavoriteRecipes",
    }),
    async login(e: Event): Promise<void | Error> {
      e.preventDefault();
      try {
        if (this.validate.validated) {
          const res = await axios.post(
            AUTH_ROUTES.BASE + AUTH_ROUTES.LOGIN,
            this.loginForm
          );
          this.setUser(res.data.user as IUser);
          this.setModalDisplay(true);
          this.setFavoriteRecipes();
          this.$router.push("/recipes");
        }
      } catch (err) {
        return new Error("Unable to login to user account");
      }
    },
  },
  computed: {
    validate(): AuthValidation | SignupValidation {
      return AuthValidator.validate(this.loginForm);
    },
    userHasTyped(): boolean {
      return (
        this.loginForm.username.length >= 1 ||
        this.loginForm.password.length >= 1
      );
    },
  },
});
</script>
<style lang="scss" scoped>
.center {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
