<script setup lang="ts">
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import SiteHeader from '@/components/SiteHeader.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useMediaStore } from './stores/media'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const mediaStore = useMediaStore()
const { fetchMedia, fetchBookmarks } = mediaStore

watchEffect(() => {
  if (isLoggedIn.value) {
    fetchMedia()
    fetchBookmarks()
  }
})
</script>

<template>
  <SiteHeader v-if="isLoggedIn" />
  <SearchInput v-if="isLoggedIn" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem 12.813rem / 1fr;
}
</style>
