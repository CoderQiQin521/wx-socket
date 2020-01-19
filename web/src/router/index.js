import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import storage from '@/utils/storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { publicAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { publicAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue')
  },
  {
    path: '/privatechat',
    name: 'privatechat',
    component: () => import(/* webpackChunkName: "about" */ '../views/Privatechat.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddFirend.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
      path: '',
      component: () => import(/* webpackChunkName: "about" */ '../views/Message.vue')
    }, {
      path: 'contacts',
      component: () => import(/* webpackChunkName: "about" */ '../views/Contacts.vue')
    }, {
      path: 'find',
      component: () => import(/* webpackChunkName: "about" */ '../views/Find.vue')
    }, {
      path: 'mine',
      component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  const { publicAuth } = to.meta
  if (!publicAuth) {
    // 判断是否存在token
    let userInfo = storage.getStorage('userInfo')
    if (userInfo) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
