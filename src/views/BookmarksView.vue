<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'
import SectionSkeleton from '@/components/SectionSkeleton.vue'
import EmptyStateIcon from '@/components/icons/EmptyStateIcon.vue'

const mediaStore = useMediaStore()
const { allShows, shows, bookmarks, userInput, isLoading } = storeToRefs(mediaStore)

const bookmarkedShows = computed(() => {
  return allShows.value.filter((show) => bookmarks.value.includes(show.id))
})

const bookmarkedMovies = computed(() => {
  return bookmarkedShows.value.filter((show) => show.category === 'Movie')
})

const bookmarkedTvSeries = computed(() => {
  return bookmarkedShows.value.filter((show) => show.category === 'TV Series')
})

const hasBookmarkedMovies = computed(() => {
  return bookmarkedMovies.value.length > 0
})

const hasBookmarkedTvSeries = computed(() => {
  return bookmarkedTvSeries.value.length > 0
})

const hasNoBookmarkedShows = computed(() => {
  return bookmarkedShows.value.length === 0
})

watchEffect(() => {
  shows.value = bookmarkedShows.value
  if (hasNoBookmarkedShows.value) userInput.value = ''
})
</script>

<template>
  <SectionSkeleton v-if="isLoading" />

  <div v-else-if="!isLoading && hasNoBookmarkedShows" class="empty-state l-flex">
    <EmptyStateIcon class="empty-state-icon" />

    <div>
      <p>You don't have any bookmarks yet.</p>
      <p>Discover <RouterLink to="/">shows</RouterLink>.</p>
    </div>
  </div>

  <template v-else>
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
