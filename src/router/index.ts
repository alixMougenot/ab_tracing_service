import EditPanelViewVue from '@/views/EditPanelView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/edit',
      name: 'edit',
      component: EditPanelViewVue
    }
  ]
})

export default router
