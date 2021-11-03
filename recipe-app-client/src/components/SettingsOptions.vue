<template>
  <v-container class="pa-6 ml-0 mt-20">
    <div class="rightbox">
      <div class="profile settings">
        <h1 class="text-h3 font-weight-bold">Profile Settings</h1>

        <h2 class="text-h6 mt-5 font-weight-bold">Name</h2>
        <v-text-field v-model="newName" placeholder="New Name" class="w-1/4">
        </v-text-field>
        <v-btn
          @click="updateName"
          depressed
          class="block mb-5"
          color="secondary"
          >Update</v-btn
        >
        <v-divider></v-divider>

        <h2 class="text-h6 mt-5 font-weight-bold">Username</h2>
        <v-text-field
          v-model="newUsername"
          placeholder="New Username"
          class="w-1/4"
        >
        </v-text-field>
        <v-btn
          @click="updateUsername"
          depressed
          class="block mb-5"
          color="secondary"
          >Update</v-btn
        >
        <v-divider></v-divider>

        <h2 class="text-h6 mt-5 font-weight-bold">Email</h2>
        <v-text-field v-model="newEmail" placeholder="New Email" class="w-1/4">
        </v-text-field>
        <v-btn
          @click="updateEmail"
          depressed
          class="block mb-5"
          color="secondary"
          >Update</v-btn
        >
        <v-divider></v-divider>

        <h2 class="text-h6 mt-5 font-weight-bold">Password</h2>
        <v-text-field
          v-model="newPassword"
          placeholder="New Password"
          class="w-1/4"
        >
        </v-text-field>
        <v-text-field
          v-model="confirmNewPassword"
          placeholder="Confirm New Password"
          class="w-1/4"
        >
        </v-text-field>
        <v-btn
          @click="updatePassword"
          depressed
          class="block mb-5"
          color="secondary"
          >Update</v-btn
        >
        <v-divider></v-divider>

        <div>
          <v-dialog v-model="openDeleteAccount" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on">
                Delete Account
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5"> Delete Account? </v-card-title>

              <v-divider></v-divider>

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
    };
  },
  methods: {
    updateName() {
      console.log("Name Updated to " + this.newName);
    },
    updateEmail() {
      console.log("Email updated to " + this.newEmail);
    },
    updateUsername() {
      console.log("Username Updated to " + this.newUsername);
    },
    updatePassword() {
      console.log("Password Updated to " + this.newPassword);
    },
    deleteAccount() {
      this.openDeleteAccount = false;
      console.log("Account has been deleted");
    },
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
});
</script>
