import { createRouter, createWebHistory } from 'vue-router'
import MobileLogin from '@/views/mobile-login/mobile-login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MobileLogin
    }
  ]
})

export default router
