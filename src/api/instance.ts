import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
})

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token') ?? localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
