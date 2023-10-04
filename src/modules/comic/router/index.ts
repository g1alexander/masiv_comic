import type { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw = {
  path: '/',
  name: 'comic',
  component: () => import('../layout/ComicLayout.vue'),
  children: [
    {
      path: '',
      name: 'comic-home',
      component: () => import('../views/HomeView.vue')
    }
  ]
}

export default router
