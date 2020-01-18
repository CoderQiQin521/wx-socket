import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import App from './App.vue'
import router from './router'
import store from './store'
import * as api from '@/http/api'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  // vuex: {
  //   store,
  //   actionPrefix: 'SOCKET_', //为vuex设置的两个前缀
  //   mutationPrefix: 'SOCKET_'
  // },
  // options: { path: "/my-app/" } //Optional options
}
))

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
