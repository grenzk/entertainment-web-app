<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

import SiteHeader from '@/components/SiteHeader.vue'
import SearchInput from '@/components/SearchInput.vue'

const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const route = useRoute()

const searchPlaceholders: Record<string, string> = {
  '/': 'Search for movies or TV series',
  '/movies': 'Search for movies',
  '/tv-series': 'Search for TV series',
  '/bookmarks': 'Search for bookmarked shows'
}

const searchPlaceholder = computed(() => {
  return searchPlaceholders[route.path]
})
</script>

<template>
  <SiteHeader v-if="isLoggedIn" />
  <SearchInput v-if="isLoggedIn" :placeholder="searchPlaceholder" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem 12.813rem / 1fr;
}
</style>
