import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import { router } from '@/router'
import { defineStore } from 'pinia'
import { useMediaStore } from './media'
import axios, { type AxiosResponse } from 'axios'
import { API_ENDPOINTS } from '@/apiConfig'

export const useAuthStore = defineStore('auth', () => {
  const mediaStore = useMediaStore()

  const authToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const publicPages = ref(['/sign-in', '/sign-up'])

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

  const showErrorMessage = (error: unknown) => {
    let message = 'An unexpected error occurred.'

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message || error.response?.data
    } else if (error instanceof Error) {
      message = error.message
    }

    Notify.create({ color: 'red', message: message })
  }

  const registerUser = async (payload: Payload) => {
    try {
      const response = await axios.post(API_ENDPOINTS.users, payload)

      router.push('/sign-in')
      Notify.create({ color: 'green', message: response.data.message })
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const loginUser = async (payload: Payload) => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.users}/sign_in`, payload)

      setUserInfo(response)

      router.push('/')
      Notify.create({ color: 'green', message: response.data.message })
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const loginUserWithToken = async (loginToken: string) => {
    try {
      const response = await axios.get(API_ENDPOINTS.member, {
        headers: {
          authorization: loginToken
        }
      })
      const currentRouteName = router.currentRoute.value.path
      const isAuthRoute = publicPages.value.includes(currentRouteName)
      const redirectPath = isAuthRoute ? '/' : ''

      setUserInfoFromToken(response)

      router.push(redirectPath)
    } catch (error) {
      console.error(error)
    }
  }

  const logoutUser = async () => {
    try {
      const response = await axios.delete(`${API_ENDPOINTS.users}/sign_out`, {
        headers: {
          authorization: authToken.value
        }
      })

      mediaStore.resetShows()
      resetUserInfo()

      router.push('/sign-in')
      Notify.create({ color: 'green', message: response.data.message })
    } catch (error) {
      showErrorMessage(error)
    }
  }

  return {
    authToken,
    user,
    publicPages,
    isLoggedIn,
    setUserInfo,
    setUserInfoFromToken,
    resetUserInfo,
    showErrorMessage,
    registerUser,
    loginUser,
    loginUserWithToken,
    logoutUser
  }
})
