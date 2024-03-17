<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows } = storeToRefs(store)
const { resetShows } = store

const tvSeries = shows.value.filter((show) => show.category === 'TV Series')

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)

  shows.value = tvSeries
})

onBeforeUnmount(() => resetShows())

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <SearchInput placeholder="Search for TV series" />

  <MediaSection section-title="TV Series" :media-list="tvSeries" />
</template>

<style></style>
