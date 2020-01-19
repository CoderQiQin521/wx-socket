import axios from './request'

export const register = data => axios.post('/register', data) //注册
export const login = data => axios.post('/login', data) // 登录
export const firend = data => axios.get('/firend', data) // 我的好友
export const alluser = data => axios.get('/alluser', data) // 全部用户
export const userOne = data => axios.get('/user', data) // 搜索用户
export const add = data => axios.post('/add', data) // 添加好友