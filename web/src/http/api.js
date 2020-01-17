import axios from './request'

export const register = data => axios.post('/register', data)
export const login = data => axios.post('/login', data)