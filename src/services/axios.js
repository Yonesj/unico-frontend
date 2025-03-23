import axios from 'axios'
import { getSession } from './authService'

const baseUrl = 'https://api.barnomz.ir/api'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession()

  if (session) {
    request.headers.Authorization = `Token ${session.accessToken}`
  }

  return request
})

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Token ${token}`
}

export default axiosInstance
