import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import store from "../store/index";
import Recipes from "../views/Recipes.vue";
import Pantry from "../views/Pantry.vue";
import Settings from "../views/Settings.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuth = store.getters["AuthModule/isLoggedIn"];
    if (!isAuth) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    next();
  }
  next();
});

export default router;
