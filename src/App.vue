<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { adjustGridForAuthPages, changeGridRows, resetGrid } from '@/utils/grid'

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
  return route.path === '/sign-in' || route.path === '/sign-up'
})

watchEffect(() => {
  if (!(route.path === '/' || authRoutes.value)) {
    changeGridRows()
    window.addEventListener('resize', changeGridRows)
  } else {
    resetGrid()
    window.removeEventListener('resize', changeGridRows)
  }

  if (authRoutes.value) {
    adjustGridForAuthPages()
    window.addEventListener('resize', adjustGridForAuthPages)
  } else {
    resetGrid()
    window.removeEventListener('resize', adjustGridForAuthPages)
  }
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
