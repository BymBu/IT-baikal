import { createRouter, createWebHistory } from 'vue-router'
import BaikalView from '../views/BaikalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BaikalView,
    },
  ],
})

export default router
