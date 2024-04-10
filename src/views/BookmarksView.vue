<script setup lang="ts">
import { onBeforeUnmount, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows, userInput, bookmarks } = storeToRefs(store)
const { resetShows } = store

watchEffect(() => {
  shows.value = shows.value.filter((show) => bookmarks.value.includes(show.id))
})

const bookmarkedMovies = computed(() => {
  return shows.value.filter((show) => show.category === 'Movie')
})

const bookmarkedTvSeries = computed(() => {
  return shows.value.filter((show) => show.category === 'TV Series')
})

onBeforeUnmount(() => resetShows())
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
