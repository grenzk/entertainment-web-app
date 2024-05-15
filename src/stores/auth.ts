import { ref, computed } from 'vue'
import { Notify } from 'quasar'
import { router } from '@/router'
import { defineStore } from 'pinia'
import { useMediaStore } from './media'
import axios, { type AxiosResponse } from 'axios'
import { http } from '@/services/axios-config'
import { API_ENDPOINTS } from '@/services/api-config'

export const useAuthStore = defineStore('auth', () => {
  const mediaStore = useMediaStore()

  const authToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const publicPages = ref(['/sign-in', '/sign-up'])

  const isLoggedIn = computed(() => {
    return !(authToken.value === null || authToken.value === JSON.stringify(null))
  })

  const setUserInfo = (response: AxiosResponse<Payload>): void => {
    user.value = response.data.user
    authToken.value = response.headers.authorization
    axios.defaults.headers.common['Authorization'] = response.headers.authorization

    localStorage.setItem('authToken', response.headers.authorization)
    localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime().toString())
  }

  const setUserInfoFromToken = (response: AxiosResponse<Payload>): void => {
    user.value = response.data.user
    authToken.value = localStorage.getItem('authToken')
  }

  const $reset = (): void => {
    user.value = null
    authToken.value = null

    localStorage.removeItem('authToken')
    localStorage.removeItem('lastLoginTime')
    axios.defaults.headers.common['Authorization'] = null
  }

  const showErrorMessage = (error: unknown): void => {
    let message = 'An unexpected error occurred.'

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message || error.response?.data
    } else if (error instanceof Error) {
      message = error.message
    }

    Notify.create({ color: 'red-10', message: message })
  }

  const registerUser = async (payload: Payload): Promise<void> => {
    try {
      const response = await axios.post<Payload>(API_ENDPOINTS.users, payload)

      router.push('/sign-in')
      Notify.create({ color: 'green', message: response.data.message })
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const loginUser = async (payload: Payload): Promise<void> => {
    const dismiss = Notify.create({ spinner: true, message: 'Logging you in...', timeout: 0 })

    try {
      const response = await axios.post<Payload>(`${API_ENDPOINTS.users}/sign_in`, payload)

      setUserInfo(response)

      router.push('/')
      Notify.create({ color: 'green', message: response.data.message })
    } catch (error) {
      showErrorMessage(error)
    }
    dismiss()
  }

  const loginUserWithToken = async (): Promise<void> => {
    try {
      const response = await http.get<Payload>(API_ENDPOINTS.member)

      const currentRouteName = router.currentRoute.value.path
      const isAuthRoute = publicPages.value.includes(currentRouteName)
      const redirectPath = isAuthRoute ? '/' : ''

      setUserInfoFromToken(response)

      router.push(redirectPath)
    } catch (error) {
      showErrorMessage(error)
    }
  }

  const logoutUser = async (): Promise<void> => {
    try {
      const response = await http.delete<Payload>(`${API_ENDPOINTS.users}/sign_out`)

      mediaStore.$reset()
      $reset()

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
    $reset,
    showErrorMessage,
    registerUser,
    loginUser,
    loginUserWithToken,
    logoutUser
  }
})
