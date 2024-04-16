<script setup lang="ts">
import { onBeforeUnmount, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'
import EmptyStateIcon from '@/components/icons/EmptyStateIcon.vue'

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

const hasShows = computed(() => {
  return shows.value.length > 0
})

onBeforeUnmount(() => resetShows())
</script>

<template>
  <template v-if="hasShows">
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

  <div v-else class="empty-state l-flex">
    <EmptyStateIcon class="empty-state-icon" />

    <div>
      <p>You don't have any bookmarks yet.</p>
      <p>Discover <RouterLink to="/">shows</RouterLink>.</p>
    </div>
  </div>
</template>

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}

.empty-state {
  flex-direction: column;
  align-items: center;
  font-size: var(--font-size-m);
  color: var(--color-neutral-greyish-blue);
  padding: 2rem;
  gap: 1rem;

  p {
    margin: 0;
    text-align: center;
  }

  a {
    color: inherit;
    font-weight: var(--font-weight-medium);
    border-bottom: 2px solid var(--color-neutral-greyish-blue);
  }

  &-icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
