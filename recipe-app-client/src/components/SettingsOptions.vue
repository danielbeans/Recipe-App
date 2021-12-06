<template>
  <v-container class="pa-6 ml-0 mt-20">
    <div class="rightbox">
      <div class="profile px-8 settings">
        <h1 class="text-h3 font-weight-bold">Profile Settings</h1>
<<<<<<< Updated upstream

        <h2 class="text-h6 mt-5 font-weight-bold">Name</h2>
        <v-text-field v-model="newName" :placeholder="getName()" class="w-1/4">
=======
        <h2 class="text-h6 mt-5 font-weight-bold">Change Name</h2>
        <v-text-field v-model="newName" placeholder="New Name" class="w-1/4">
>>>>>>> Stashed changes
        </v-text-field>
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
<<<<<<< Updated upstream
          :placeholder="getUsername()"
=======
          placeholder="New Username text-white"
>>>>>>> Stashed changes
          class="w-1/4"
        >
        </v-text-field>
        <v-btn
          @click="updateUsername"
          depressed
          class="block mb-5 text-white"
          color="red"
          >Update Username</v-btn
        >
        <v-divider></v-divider>

<<<<<<< Updated upstream
        <h2 class="text-h6 mt-5 font-weight-bold">Email</h2>
        <v-text-field
          v-model="newEmail"
          :placeholder="getEmail()"
          class="w-1/3"
        >
=======
        <h2 class="text-h6 mt-5 font-weight-bold">Change Email</h2>
        <v-text-field v-model="newEmail" placeholder="New Email" class="w-1/4">
>>>>>>> Stashed changes
        </v-text-field>
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
          v-model="newPassword"
          placeholder="New Password"
          class="w-1/3"
        >
        </v-text-field>
        <v-text-field
          v-model="confirmNewPassword"
          placeholder="Confirm New Password"
          class="w-1/3"
        >
        </v-text-field>
        <v-btn
          @click="updatePassword"
          depressed
          color="red"
          class="block mb-5 text-white"
          >Update Password</v-btn
        >

        <v-divider class="block mb-5"></v-divider>

        <input type="radio" id="lightMode" value="light" v-model="display" />
        <label for="lightMode">Light Mode</label>
        <br />
        <input type="radio" id="darkMode" value="dark" v-model="display" />
        <label for="darkMode">Dark Mode</label>
        <br />
        <div class="block mb-5"></div>

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
import { mapGetters } from "vuex";
import axios from "axios";
import { SETTINGS_ROUTES } from "@shared/routes";
export default Vue.extend({
  name: "SettingsOptions",
  data() {
    return {
      openDeleteAccount: false,
      newName: "",
      newEmail: "",
      newUsername: "",
      newPassword: "",
      confirmNewPassword: "",
      display: "light",
      nameError: "",
    };
  },
  methods: {
    getName() {
      return this.getUser.name;
    },
    getUsername() {
      return this.getUser.username;
    },
    getEmail() {
      return this.getUser.email;
    },
    async updateName() {
      const res = await axios.post(
        SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_NAME,
        {
          token: this.getUser.jwt.token,
          newName: this.newName,
        }
      );
      const data = res.data;
      if (data.error) {
        this.nameError = data.error;
        console.log(this.nameError);
        return;
      }
      console.log("Name Updated to " + this.newName);
    },
    async updateEmail() {
      const res = await axios.post(
        SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_EMAIL,
        {
          token: this.getUser.jwt.token,
          newEmaile: this.newEmail,
        }
      );
      const data = res.data;
      if (data.error) {
        this.nameError = data.error;
        console.log(this.nameError);
        return;
      }
      console.log("Email updated to " + this.newEmail);
    },
    async updateUsername() {
      const res = await axios.post(
        SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_USERNAME,
        {
          token: this.getUser.jwt.token,
          newUsername: this.newUsername,
        }
      );
      const data = res.data;
      if (data.error) {
        this.nameError = data.error;
        console.log(this.nameError);
        return;
      }
      console.log("Username Updated to " + this.newUsername);
    },
    async updatePassword() {
      const res = await axios.post(
        SETTINGS_ROUTES.BASE + SETTINGS_ROUTES.UPDATE_PASSWORD,
        {
          token: this.getUser.jwt.token,
          newName: this.newPassword,
          currentPassword: this.currentPassword,
        }
      );
      const data = res.data;
      if (data.error) {
        this.nameError = data.error;
        console.log(this.nameError);
        return;
      }
      console.log("Password Updated to " + this.newPassword);
    },
    async deleteAccount() {
      this.openDeleteAccount = false;
      console.log("Account has been deleted");
    },
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
});
</script>
