import axios from './request'

export const register = data => axios.post('/register', data)
export const login = data => axios.post('/login', data)
export const firend = data => axios.get('/firend', data)
export const alluser = data => axios.get('/alluser', data)
export const userOne = data => axios.get('/user', data)
export const add = data => axios.post('/add', data)