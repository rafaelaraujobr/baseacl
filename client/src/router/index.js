import Vue from 'vue'
import VueRouter from 'vue-router'
import authGuard from "./authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: {
      requiresAuth: false,
    },
    component: () => import(/* webpackChunkName: "auth" */ '../pages/Auth.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(authGuard);

export default router
