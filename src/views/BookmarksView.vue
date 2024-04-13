<script setup lang="ts">
import { onBeforeUnmount, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows, bookmarks } = storeToRefs(store)
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

const hasBookmarkedMovies = computed(() => {
  return bookmarkedMovies.value.length > 0
})

const hasBookmarkedTvSeries = computed(() => {
  return bookmarkedTvSeries.value.length > 0
})

onBeforeUnmount(() => resetShows())
</script>

<template>
  <MediaSection
    v-if="hasBookmarkedMovies"
    class="bookmarked-movies"
    section-title="Bookmarked Movies"
    :media-list="bookmarkedMovies"
  />

  <MediaSection
    v-if="hasBookmarkedTvSeries"
    class="bookmarked-tv-series"
    section-title="Bookmarked TV Series"
    :media-list="bookmarkedTvSeries"
    :disabled-filtered-shows="hasBookmarkedMovies"
  />
</template>

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}
</style>
