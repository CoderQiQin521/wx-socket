import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  return config
},
  error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(response => {
  console.log(`%c接口地址:${response.config.url}`, 'font-weight:bold;color:blue;', response.data);
  const { err_code, data } = response.data
  if (err_code !== 0) {

  }
  return response.data
}, error => {
  return Promise.reject(error)
})

export default axios