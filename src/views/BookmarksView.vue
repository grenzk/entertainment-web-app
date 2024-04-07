<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'
import Axios from 'axios'
import { changeGridRows, resetGrid } from '@/utils/grid'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows, userInput } = storeToRefs(store)
const { resetShows } = store

const bookmarks = ref<number[]>([])

const fetchBookmarks = async () => {
  try {
    const response = await Axios.get('http://127.0.0.1:3000/api/v1/bookmarks')
    bookmarks.value = response.data.map((item: { medium_id: number }) => item.medium_id)
    shows.value = shows.value.filter((show) => bookmarks.value.includes(show.id))
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  changeGridRows()
  fetchBookmarks()
  window.addEventListener('resize', changeGridRows)
})

const bookmarkedMovies = computed(() => {
  return shows.value.filter((show) => show.category === 'Movie')
})

const bookmarkedTvSeries = computed(() => {
  return shows.value.filter((show) => show.category === 'TV Series')
})

onBeforeUnmount(() => resetShows())

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <MediaSection
    class="bookmarked-movies"
    section-title="Bookmarked Movies"
    :media-list="bookmarkedMovies"
  />

  <MediaSection
    v-if="userInput.length === 0"
    section-title="Bookmarked TV Series"
    :media-list="bookmarkedTvSeries"
    disabled-filtered-shows
  />
</template>

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}
</style>
