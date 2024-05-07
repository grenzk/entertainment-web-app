<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import SearchIcon from '@/components/icons/SearchIcon.vue'

const route = useRoute()

const searchPlaceholders: Record<string, string> = {
  '/': 'Search for movies or TV series',
  '/movies': 'Search for movies',
  '/tv-series': 'Search for TV series',
  '/bookmarks': 'Search for bookmarked shows'
}

const searchPlaceholder = computed(() => {
  return searchPlaceholders[route.path]
})

const mediaStore = useMediaStore()
const { bookmarks, userInput } = storeToRefs(mediaStore)

const isSearchDisabled = computed(() => {
  return route.path === '/bookmarks' && bookmarks.value.length === 0
})
</script>

<template>
  <div class="search-group l-flex l-container">
    <SearchIcon class="search-icon" />
    <QInput
      class="search-input"
      type="search"
      v-model="userInput"
      :placeholder="searchPlaceholder"
      :disable="isSearchDisabled"
    />
  </div>
</template>

<style lang="scss">
.search-group {
  align-self: start;
  align-items: center;
  gap: 1rem;
}

.search-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.search-input {
  width: 100%;

  &.q-field--with-bottom {
    padding-bottom: 0 !important;
  }

  &.q-field--standard .q-field__control::before {
    border-bottom: none !important;
  }

  &.q-field--standard .q-field__control::after {
    height: 1px !important;
    transform: scale3d(0, 1, 1) !important;
  }

  .q-field__control {
    position: unset !important;
    color: var(--color-neutral-greyish-blue) !important;
    height: 2.313rem !important;
  }

  .q-field__native {
    padding: 0 !important;
    font-size: var(--font-size-m);
    font-weight: var(--font-weight-light) !important;
    color: var(--color-neutral-white) !important;
    caret-color: var(--color-primary-red);
  }

  .q-placeholder::placeholder {
    color: var(--color-neutral-white) !important;
    opacity: 0.4979 !important;
  }
}
</style>
