import { ref, computed } from 'vue'
import { router } from '@/router'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const returnUrl = ref<string | null>(null)

  const isLoggedIn = computed(() => {
    return !(authToken.value === null || authToken.value === JSON.stringify(null))
  })

  const setUserInfo = (response: AxiosResponse<Payload>) => {
    user.value = response.data.user
    authToken.value = response.headers.authorization
    axios.defaults.headers.common['Authorization'] = response.headers.authorization

    localStorage.setItem('authToken', response.headers.authorization)
  }

  const setUserInfoFromToken = (response: AxiosResponse<Payload>) => {
    user.value = response.data.user
    authToken.value = localStorage.getItem('authToken')
  }

  const resetUserInfo = () => {
    user.value = null
    authToken.value = null

    localStorage.removeItem('authToken')
    axios.defaults.headers.common['Authorization'] = null
  }

  const registerUser = async (payload: Payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users`, payload)

      setUserInfo(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const loginUser = async (payload: Payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/users/sign_in`, payload)

      setUserInfo(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const loginUserWithToken = async ({ authToken }: { authToken: string }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/member-data`, {
        headers: {
          authorization: authToken
        }
      })

      setUserInfoFromToken(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const logoutUser = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/users/sign_out`, {
        headers: {
          authorization: authToken.value
        }
      })
      resetUserInfo()
      router.push('/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    authToken,
    user,
    returnUrl,
    isLoggedIn,
    setUserInfo,
    setUserInfoFromToken,
    resetUserInfo,
    registerUser,
    loginUser,
    loginUserWithToken,
    logoutUser
  }
})
