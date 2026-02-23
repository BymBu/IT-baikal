import { createRouter, createWebHistory } from "vue-router";
import BaikalView from "../views/BaikalView.vue";
import WelcomeView from "@/views/WelcomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/baikal",
      name: "baikal",
      component: BaikalView,
    },
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
  ],
});

export default router;
