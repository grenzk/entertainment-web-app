import { ref, computed } from 'vue'
import { router } from '@/router'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { API_ENDPOINTS } from '@/apiConfig'

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
      const response = await axios.post(API_ENDPOINTS.users, payload)

      setUserInfo(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const loginUser = async (payload: Payload) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.users}/sign_in`, payload)

      setUserInfo(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const loginUserWithToken = async ({ authToken }: { authToken: string }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.member, {
        headers: {
          authorization: authToken
        }
      })

      if (response.data.user === null) return resetUserInfo()

      setUserInfoFromToken(response)
      router.push(returnUrl.value || '/')
    } catch (error) {
      console.error(error)
    }
  }

  const logoutUser = async () => {
    try {
      await axios.delete(`${API_ENDPOINTS.users}/sign_out`, {
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
