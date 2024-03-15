<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const userInput = ref('')
const tvSeriesMedia = data.value.filter((media) => media.category === 'TV Series')

const filteredList = computed(() => {
  return tvSeriesMedia.filter((media) => {
    return media.title.toLowerCase().includes(userInput.value.toLowerCase())
  })
})

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
    :media-list="tvSeriesMedia"
    :search-input="userInput"
    :filtered-search="filteredList"
  />
</template>

<style></style>
