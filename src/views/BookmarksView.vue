<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const userInput = ref('')
const bookmarkedMovies = data.value.filter((media) => {
  return media.isBookmarked && media.category === 'Movie'
})
const bookmarkedTvSeries = data.value.filter((media) => {
  return media.isBookmarked && media.category === 'TV Series'
})
const bookmarkedShows = data.value.filter((media) => media.isBookmarked)

const filteredList = computed(() => {
  return bookmarkedShows.filter((media) => {
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
  <SearchInput v-model="userInput" placeholder="Search for bookmarked shows" />

  <MediaSection
    v-if="userInput.length === 0"
    section-title="Bookmarked Movies"
    :search-input="userInput"
    :enable-filter-search="false"
    :media-list="bookmarkedMovies"
    :filtered-search="filteredList"
  />

  <MediaSection
    section-title="Bookmarked TV Series"
    :search-input="userInput"
    :media-list="bookmarkedTvSeries"
    :filtered-search="filteredList"
  />
</template>

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}
</style>
