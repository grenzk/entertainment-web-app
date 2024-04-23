<script setup lang="ts">
import { onBeforeUnmount, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import { changeGridRows, resetGrid } from '@/utils/grid'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows } = storeToRefs(store)
const { resetShows } = store

const tvSeries = computed(() => shows.value.filter((show) => show.category === 'TV Series'))

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)

  shows.value = tvSeries.value
})

onBeforeUnmount(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)

  resetShows()
})
</script>

<template>
  <MediaSection section-title="TV Series" :media-list="tvSeries" />
</template>
