import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import store from "../store/index";
import Recipes from "../views/Recipes.vue";
import Pantry from "../views/Pantry.vue";
import { AUTH_ROUTES } from "@shared/routes";
import axios from "axios";
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

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const res = await axios.post(AUTH_ROUTES.BASE + AUTH_ROUTES.VERIFY, {
        token: store.getters["AuthModule/getUser"]?.token,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      store.dispatch("AuthModule/logoutUser");
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    const isAuth = store.getters["AuthModule/isLoggedIn"];
    console.log(isAuth);
    if (!isAuth) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    }
    next();
  }
  console.log("awgawah");
  next();
});

export default router;
