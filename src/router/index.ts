import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Show from '../views/settings/Show.vue'
import Index from '../views/settings/Index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/:name',
    name: 'Show',
    component: Show
  }
]

const router = new VueRouter({
  routes
})

export default router
