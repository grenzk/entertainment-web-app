<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const userInput = ref('')
const movieMedia = data.value.filter((media) => media.category === 'Movie')

const filterSearchResults = () => {
  return movieMedia.filter((media) => {
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
  <SearchInput v-model="userInput" placeholder="Search for movies" />

  <MediaSection
    section-title="Movies"
    :search-input="userInput"
    :media-list="movieMedia"
    :filter-search="filterSearchResults"
  />
</template>

<style></style>
