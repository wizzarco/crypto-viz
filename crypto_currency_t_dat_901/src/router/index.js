import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import CrytocurrencyView from '../views/Cryptocurrency.vue'
import ErrorView from '../views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/cryptocurrency',
      name: 'cryptocurrency',
      component: CrytocurrencyView
    },

    // Page 404 Error
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "error",
      component: ErrorView,
    }
  ]
})

export default router
