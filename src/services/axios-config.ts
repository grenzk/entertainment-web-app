import { router } from '@/router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export const http = axios.create()

const getToken = (): string | null => {
  const currentTime = new Date(Date.now()).getTime()
  const oneHour = 1000 * 60 * 60
  const loginTime = parseInt(localStorage.getItem('lastLoginTime')!)
  const timeSinceLastLogin = currentTime - loginTime

  if (timeSinceLastLogin < oneHour) {
    return localStorage.getItem('authToken')
  } else {
    return null
  }
}

http.interceptors.request.use(
  (request) => {
    const authStore = useAuthStore()
    const loginToken = getToken()

    if (loginToken) {
      request.headers.Authorization = loginToken
    } else {
      authStore.$reset()

      alert('Your session has expired.')
      router.push('/sign-in')
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
