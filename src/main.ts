import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

import App from '@/App.vue'
import { router } from '@/router'
import { useAuthStore } from '@/stores/auth'

import 'quasar/src/css/index.sass'
import '@/assets/scss/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {})

const authStore = useAuthStore()
const { loginUserWithToken } = authStore
const localAuthToken = localStorage.authToken
const cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null

if (cookieExists) {
  const authToken = localStorage.getItem('authToken')
  const authTokenExists = authToken !== 'undefined' && authToken !== null

  if (authTokenExists) {
    await loginUserWithToken({ authToken })
  }
}

router.beforeEach((to) => {
  const publicPages = ['/sign-up', '/sign-in']
  const requiresAuth = !publicPages.includes(to.path)

  if (requiresAuth && !authStore.isLoggedIn) {
    authStore.returnUrl = to.fullPath
    return '/sign-in'
  }
})

app.mount('#app')
