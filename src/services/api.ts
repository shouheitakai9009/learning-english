import { ACCESS_TOKEN } from '@/constants/auth'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT
})

api.interceptors.request.use(config => {
  const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, error => Promise.reject(error))

export { api }