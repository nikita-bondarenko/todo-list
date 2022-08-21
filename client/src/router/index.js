import { createRouter, createWebHistory } from 'vue-router'
import MainPageVue from '@/App.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPageVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
