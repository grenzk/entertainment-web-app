<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows, userInput } = storeToRefs(store)
const { resetShows } = store

const bookmarkedMovies = shows.value.filter((show) => {
  return show.isBookmarked && show.category === 'Movie'
})
const bookmarkedTvSeries = shows.value.filter((show) => {
  return show.isBookmarked && show.category === 'TV Series'
})

const bookmarkedShows = shows.value.filter((media) => media.isBookmarked)

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)

  shows.value = bookmarkedShows
})

onBeforeUnmount(() => resetShows())

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <SearchInput placeholder="Search for bookmarked shows" />

  <MediaSection
    class="bookmarked-movies"
    section-title="Bookmarked Movies"
    :media-list="bookmarkedMovies"
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
