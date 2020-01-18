import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
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
    name: 'home',
    component: Home,
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
      path: 'user',
      component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
