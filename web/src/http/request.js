import axios from 'axios'
import { Toast } from 'vant';
import router from '@/router'
import storage from '@/utils/storage'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const userInfo = storage.getStorage('userInfo')
  if (userInfo && userInfo.token) {
    config.headers['Authorization'] = 'Bearer ' + (userInfo.token || '')
  }
  return config
},
  error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(response => {
  console.log(`%c接口地址:${response.config.url}`, 'font-weight:bold;color:blue;', response.data);
  const { err_code, data, msg } = response.data
  if (err_code !== 0) {
    Toast(msg);
  }
  if (err_code === 301) {
    localStorage.clear()
    router.push('/login')
  }
  return response.data
}, error => {
  return Promise.reject(error)
})

export default axios