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
    class="bookmarked-movies"
    section-title="Bookmarked Movies"
    :media-list="bookmarkedMovies"
    :search-input="userInput"
    :filtered-search="filteredList"
  />

  <MediaSection
    v-if="userInput.length === 0"
    section-title="Bookmarked TV Series"
    :media-list="bookmarkedTvSeries"
    disabled-filter-search
  />
</template>

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}
</style>
