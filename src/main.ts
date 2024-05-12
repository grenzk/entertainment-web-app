import { createApp } from 'vue'
import { createPinia, storeToRefs } from 'pinia'
import { Quasar, Notify } from 'quasar'

import App from '@/App.vue'
import { router } from '@/router'
import { useAuthStore } from '@/stores/auth'

import 'quasar/src/css/index.sass'
import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Notify }
})

const authStore = useAuthStore()
const { isLoggedIn, publicPages } = storeToRefs(authStore)
const { loginUserWithToken } = authStore

const localAuthToken = localStorage.authToken
const cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null

if (cookieExists) {
  const loginToken = localStorage.getItem('authToken')
  const authTokenExists = loginToken !== 'undefined' && loginToken !== null

  if (authTokenExists) {
    await loginUserWithToken()
  }
}

router.beforeEach((to) => {
  const requiresAuth = !publicPages.value.includes(to.path)

  if (requiresAuth && !isLoggedIn.value) {
    return '/sign-in'
  } else if (!requiresAuth && isLoggedIn.value) {
    return false
  }
})

app.mount('#app')
