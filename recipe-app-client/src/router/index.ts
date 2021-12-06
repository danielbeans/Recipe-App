import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import store from "../store/index";
import Recipes from "../views/Recipes.vue";
import Pantry from "../views/Pantry.vue";
import Settings from "../views/Settings.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/pantry",
    name: "Pantry",
    component: Pantry,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      isGuestRoute: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      isGuestRoute: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.getters["AuthModule/isLoggedIn"];
  if (to.matched.some((record) => record.meta.isGuestRoute)) {
    if (isLoggedIn) return next({ path: "/recipes" });
    next();
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["AuthModule/getUser"]?.jwt?.exp < Date.now() / 1000) {
      store.dispatch("AuthModule/logoutUser");
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    if (!isLoggedIn) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    next();
  }
  next();
});

export default router;
