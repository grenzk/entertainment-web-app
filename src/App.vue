<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import SiteHeader from '@/components/SiteHeader.vue'
import SearchInput from '@/components/SearchInput.vue'

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

const authRoutes = computed(() => {
  return route.name === 'sign-in' || route.name === 'sign-up'
})
</script>

<template>
  <SiteHeader v-if="!authRoutes" />
  <SearchInput v-if="!authRoutes" :placeholder="searchPlaceholder" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem 12.813rem / 1fr;
}
</style>
