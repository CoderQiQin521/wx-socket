import Vue from 'vue'
import Vuex from 'vuex'
import { login } from '@/http/api'
import router from '@/router'
import { Dialog } from "vant";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo'))
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      let { err_code, data, msg } = await login(payload);
      if (err_code === 0) {
        // const { user, token } = data
        localStorage.setItem('userInfo', JSON.stringify(data))
        commit('setUserInfo', data)
        // TODO: 成功失败提醒

        router.push('/')
        // Dialog({ message: `欢迎${data.user.nickname}登录` });
        // Toast(msg);
        // setTimeout(() => {
        // }, 1500);
      }
    },
    logout({ commit }, payload) {
      Dialog.confirm({
        title: '提醒',
        message: '是否退出此账号?'
      }).then(() => {
        // on confirm
        router.push('/login')
        localStorage.removeItem('userInfo')
        commit('setUserInfo', {})
      }).catch(() => {
        // on cancel
      });

    }
  },
  modules: {
  }
})
