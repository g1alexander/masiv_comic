import { createRouter, createWebHistory } from 'vue-router'
import comicRoutes from '@/modules/comic/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...comicRoutes
    }
  ]
})

export default router
