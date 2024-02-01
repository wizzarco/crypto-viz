import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import CrytocurrencyView from '../views/Cryptocurrency.vue'
import ExchangeView from '../views/Exchanges.vue'
import ErrorView from '../views/404.vue'
import CrytodetailsView from '../views/Cryptodetails.vue'
import CryptocurrencyDetail from '../views/Cryptodetails.vue';

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

    {
      path: '/cryptocurrency/:symbol',
      name: 'CryptocurrencyDetail',
      component: CryptocurrencyDetail,
      props: true
    },

    {
      path: '/cryptodetails',
      name: 'cryptodetails',
      component: CrytodetailsView
    },

    {
      path: '/exchanges',
      name: 'exchanges',
      component: ExchangeView
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