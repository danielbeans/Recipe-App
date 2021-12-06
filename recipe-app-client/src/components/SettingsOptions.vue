<template>
  <v-container class="pa-6 ml-0 mt-5">
    <div class="rightbox">
      <div class="profile px-8 settings">
        <h1 class="text-h3 font-weight-bold">Profile Settings</h1>
        <h2 class="text-h6 mt-5 font-weight-bold">Change Name</h2>
        <v-text-field v-model="newName" placeholder="New Name" class="w-1/4">
        </v-text-field>
        <p class="text-red-500">{{ nameError }}</p>
        <v-btn
          @click="updateName"
          depressed
          class="block mb-5 text-white"
          color="red"
          >Update Name</v-btn
        >
        <v-divider></v-divider>
        <h2 class="text-h6 mt-5 font-weight-bold">Change Username</h2>
        <v-text-field
          v-model="newUsername"
          placeholder="New Username"
          class="w-1/4"
        >
        </v-text-field>
        <p class="text-red-500">{{ usernameError }}</p>
        <v-btn
          @click="updateUsername"
          depressed
          class="block mb-5 text-white"
          color="red"
          >Update Username</v-btn
        >
        <v-divider></v-divider>
        <h2 class="text-h6 mt-5 font-weight-bold">Change Email</h2>
        <v-text-field v-model="newEmail" placeholder="New Email" class="w-1/4">
        </v-text-field>
        <p class="text-red-500">{{ emailError }}</p>
        <v-btn
          @click="updateEmail"
          depressed
          class="block mb-5 text-white"
          color="red"
          >Update Email</v-btn
        >
        <v-divider></v-divider>
        <h2 class="text-h6 mt-5 font-weight-bold">Change Password</h2>
        <v-text-field
          type="password"
          v-model="currentPassword"
          placeholder="Current Password"
          class="w-1/3"
        />
        <v-text-field
          type="password"
          v-model="newPassword"
          placeholder="New Password"
          class="w-1/3"
        />
        <v-text-field
          type="password"
          v-model="confirmNewPassword"
          placeholder="Confirm New Password"
          class="w-1/3"
        />
        <p class="text-red-500">{{ passwordError }}</p>
        <v-btn
          @click="updatePassword"
          depressed
          color="red"
          class="block mb-5 text-white"
          >Update Password</v-btn
        >
        <v-divider class="block mb-5"></v-divider>
        <div>
          <v-dialog v-model="openDeleteAccount" width="500">
            <template v-slot:activator="{ on, attrs }">
              <h2 class="text-h6 mt-5 font-weight-bold">Delete Account</h2>
              <v-btn class="mt-5" color="red" dark v-bind="attrs" v-on="on">
                Delete Account
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Delete Account? </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-5">
                Deleting your account will delete all data associated with it.
                This action is irreversibile. Are you sure you would like to do
                so?</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="deleteAccount">
                  Delete
                </v-btn>
                <v-btn
                  color="secondary"
                  text
                  @click="openDeleteAccount = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import axios, { AxiosError } from "axios";
import { SETTINGS_ROUTES } from "@shared/routes";
import { AlertType } from "../enum/alert.enum";
export default Vue.extend({
  name: "SettingsOptions",
  data() {
    return {
      openDeleteAccount: false,
      newName: "",
      newEmail: "",
      newUsername: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      nameError: "",
      usernameError: "",
      passwordError: "",
      emailError: "",
    };
  },
  methods: {
    ...mapActions({
      logoutUser: "AuthModule/logoutUser",
      setUsername: "AuthModule/setUsername",
      setEmail: "AuthModule/setEmail",
      setName: "AuthModule/setName",
    }),
    async updateName() {
      try {
        await axios.post(SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_NAME, {
          token: this.getUser.jwt.token,
          newName: this.newName,
        });
        this.setName(this.newName);
        this.newName = "";
        this.nameError = "";
      } catch (err) {
        if (err !== undefined && axios.isAxiosError(err))
          this.nameError = `Unable to update your name at this time, please try again later.`;
      }
    },
    async updateEmail() {
      try {
        await axios.post(SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_EMAIL, {
          token: this.getUser.jwt.token,
          newEmail: this.newEmail,
        });
        this.setEmail(this.newEmail);
        this.newEmail = "";
        this.emailError = "";
      } catch (err) {
        if (err !== undefined && axios.isAxiosError(err))
          this.emailError = (err as AxiosError).response!.data.error;
      }
    },
    async updateUsername() {
      try {
        await axios.post(
          SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_USERNAME,
          {
            token: this.getUser.jwt.token,
            newUsername: this.newUsername,
          }
        );
        this.setUsername(this.newUsername);
        this.newUsername = "";
        this.usernameError = "";
      } catch (err) {
        if (err !== undefined && axios.isAxiosError(err))
          this.usernameError = (err as AxiosError).response!.data.error;
      }
    },
    async updatePassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.passwordError =
          "Passwords do not match, please double check and try again.";
        return;
      }
      try {
        await axios.post(
          SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_PASSWORD,
          {
            token: this.getUser.jwt.token,
            newName: this.newPassword,
            currentPassword: this.currentPassword,
          }
        );
        this.newPassword = "";
        this.confirmNewPassword = "";
        this.currentPassword = "";
        this.passwordError = "";
      } catch (err) {
        if (err !== undefined && axios.isAxiosError(err))
          this.passwordError = (err as AxiosError).response!.data.error;
      }
    },
    async deleteAccount() {
      await axios.post(SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.DELETE, {
        token: this.getUser.jwt.token,
      });
      this.logoutUser();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
});
</script>
