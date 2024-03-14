<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const userInput = ref('')
const tvSeriesMedia = data.value.filter((media) => media.category === 'TV Series')

const filterSearchResults = () => {
  return tvSeriesMedia.filter((media) => {
    return media.title.toLowerCase().includes(userInput.value.toLowerCase())
  })
}

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)
})

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <SearchInput v-model="userInput" placeholder="Search for TV series" />

  <MediaSection
    section-title="TV Series"
    :search-input="userInput"
    :media-list="tvSeriesMedia"
    :filter-search="filterSearchResults"
  />
</template>

<style></style>
