<template>
  <div>
    <v-app-bar class="d-md-none"
      ><v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Recipe Lens</v-toolbar-title></v-app-bar
    >
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      app
      light
    >
      <v-list v-if="getUser">
        <v-list-item class="center flex justify-center">
          <v-list-item-avatar
            class="ma-0"
            style="clip-path: circle(45%)"
            size="100"
          >
            <v-img v-html="getAvatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item class="text-center">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ getUser.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ getUser.username }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <div v-if="!isLoggedIn">
          <v-list-item
            active-class="bg-red-500 text-white"
            v-for="item in authItems"
            :key="item.name"
            link
            :to="item.route"
            ><v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            active-class="bg-red-500 text-white"
            v-for="item in navItems"
            :key="item.name"
            link
            :to="item.route"
            ><v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout"
            ><v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { IUser } from "../interfaces/user.interface";

interface IVListItem {
  name: string;
  icon: string;
  route: string;
}

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      drawer: false,
      authItems: [
        { name: "Login", icon: "mdi-account", route: "/login" },
        { name: "Sign Up", icon: "mdi-account-plus", route: "/signup" },
      ] as IVListItem[],
      navItems: [
        { name: "Recipes", icon: "mdi-book", route: "/recipes" },
        { name: "Pantry", icon: "mdi-fridge", route: "/pantry" },
        { name: "Order", icon: "mdi-cart", route: "/order" },
        { name: "Settings", icon: "mdi-cog", route: "/settings" },
      ] as IVListItem[],
    };
  },
  methods: {
    ...mapActions({ logoutUser: "AuthModule/logoutUser" }),
    logout(): void {
      this.logoutUser();
      this.$router.push("/login");
    },
  },
  computed: {
    getAvatar(): string {
      return (this.getUser as IUser).avatar;
    },
    ...mapGetters({
      getUser: "AuthModule/getUser",
      isLoggedIn: "AuthModule/isLoggedIn",
    }),
  },
});
</script>
