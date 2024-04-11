<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { changeGridRows, resetGrid } from '@/utils/grid'

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

watchEffect(() => {
  if (route.path !== '/') {
    changeGridRows()
    window.addEventListener('resize', changeGridRows)
  } else {
    resetGrid()
    window.removeEventListener('resize', changeGridRows)
  }
})
</script>

<template>
  <SiteHeader />
  <SearchInput :placeholder="searchPlaceholder" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem 12.813rem / 1fr;
}
</style>
