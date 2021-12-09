<template>
  <div
    class="
      signup-form
      mx-auto
      w-full
      text-left
      md:mt-5
      lg:max-w-xl
      md:absolute
      md:top-1/2
      md:left-1/2
      md:transform
      md:-translate-x-1/2
      md:-translate-y-1/2
    "
  >
    <form
      class="bg-white md:shadow-md rounded px-8 pt-6 pb-5 mb-4 relative"
      @submit="signup"
    >
      <h3 class="text-xl mb-4 text-gray-600 text-center">Sign up</h3>
      <div class="mb-4 flex flex-wrap md:flex-nowrap">
        <div class="w-full md:mr-5 mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Full Name</label
          >
          <input
            v-model="signupForm.name"
            required
            class="
              shadow
              appearance-none
              border
              rounded
              py-2
              px-3
              w-full
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
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
            class="
              shadow
              appearance-none
              border
              rounded
              py-2
              w-full
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            :class="{ 'border-red-500': !validate.username && userHasTyped }"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
      <div class="mb-4 flex flex-wrap md:flex-nowrap">
        <div class="w-full md:mr-5 mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Password*</label
          >
          <input
            v-model="signupForm.password"
            required
            class="
              shadow
              appearance-none
              border
              rounded
              py-2
              px-3
              w-full
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
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
            class="
              shadow
              appearance-none
              border
              rounded
              py-2
              w-full
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
            "
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
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-700
            mb-3
            leading-tight
            focus:outline-none focus:shadow-outline
          "
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
          class="
            bg-red-500
            w-full
            hover:bg-red-400
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="submit"
        >
          Sign Up
        </button>
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
          to="/login"
          >Already have an account? Login here</router-link
        >
      </div>
      <Modal
        class="mt-7 w-full text-center"
        v-if="response.display"
        :isNotLogin="true"
        :type="response.type"
        :text="response.message"
        :key="NaN"
      />
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios, { AxiosError } from "axios";
import { mapActions } from "vuex";
import Modal from "@/components/Modal.vue";
import {
  AuthValidator,
  AuthValidation,
  SignupValidation,
} from "@/helpers/validator";
import ISignupForm from "@/interfaces/signup.interface";
import { AUTH_ROUTES } from "@shared/routes";
import { AlertType } from "@/enum/alert.enum";
import { IUser } from "@/interfaces/user.interface";

interface ISignupResponse {
  message: string;
  type: AlertType;
  display: boolean;
}

export default Vue.extend({
  components: { Modal },
  data() {
    return {
      response: {
        message: "",
        type: AlertType.ERROR,
        display: false,
      } as ISignupResponse,
      signupForm: {
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      } as ISignupForm,
    };
  },
  methods: {
    ...mapActions({
      setUser: "AuthModule/setUser",
      setModalDisplay: "AuthModule/setModalDisplay",
    }),
    async signup(event: Event): Promise<void> {
      event.preventDefault();
      if (this.validate.validated) {
        try {
          const res = await axios.post(AUTH_ROUTES.BASE + AUTH_ROUTES.SIGNUP, {
            name: this.signupForm.name,
            email: this.signupForm.email,
            username: this.signupForm.username,
            password: this.signupForm.password,
          });
          this.setUser(res.data.user as IUser);
          this.setModalDisplay(true);
          this.$router.push("/recipes");
        } catch (err) {
          this.response = {
            message: (err as AxiosError).response?.data.error,
            type: AlertType.ERROR,
            display: true,
          };
        }
      }
    },
  },
  computed: {
    validate(): AuthValidation | SignupValidation {
      return AuthValidator.validate(this.signupForm);
    },
    userHasTyped(): boolean {
      return (
        this.signupForm.username.length >= 1 ||
        this.signupForm.password.length >= 1 ||
        this.signupForm.confirmPassword.length >= 1 ||
        this.signupForm.email.length >= 1 ||
        this.signupForm.name.length >= 1
      );
    },
  },
});
</script>

<style scoped>
.center {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
