import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/components/button',
      name: 'button',
      component: () => import('../views/ButtonView.vue')
    },
    {
      path: '/components/badge',
      name: 'badge',
      component: () => import('../views/BadgeView.vue')
    }
  ]
})

export default router