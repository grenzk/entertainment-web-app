<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import SiteHeader from '@/components/SiteHeader.vue'
import SearchInput from '@/components/SearchInput.vue'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)
</script>

<template>
  <SiteHeader v-if="isLoggedIn" />
  <SearchInput v-if="isLoggedIn" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem / 1fr;
}
</style>
