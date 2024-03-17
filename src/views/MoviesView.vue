<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import { changeGridRows, resetGrid } from '@/utils/grid'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows } = storeToRefs(store)
const { resetShows } = store

const movies = shows.value.filter((show) => show.category === 'Movie')

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)

  shows.value = movies
})

onBeforeUnmount(() => resetShows())

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <MediaSection section-title="Movies" :media-list="movies" />
</template>

<style></style>
