import App from '@/application/App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: '/', name: 'sign-in', component: App }]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
