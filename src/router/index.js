import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "@/components/cards/SignIn";
import SignUp from "@/components/cards/SignUp";
import MainPage from "@/views/MainPage";
import Statistics from "@/views/Statistics";
import CubeSettings from "@/views/CubeSettings";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: SignIn,
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: SignUp,
      },
    ],
  },
  {
    path: "/home",
    name: "main-page",
    component: MainPage
  },
  {
    path: "/statistics",
    name: "statistics-page",
    component: Statistics
  },
  {
    path: "/gadget-setup",
    name: "cube-settings-page",
    component: CubeSettings
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];


const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
