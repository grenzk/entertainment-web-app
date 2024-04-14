<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaContent from '@/components/MediaContent.vue'

const props = defineProps<{
  sectionTitle: string
  disabledFilteredShows?: boolean
  mediaList: MediaItem[]
}>()

const store = useMediaStore()
const { userInput, filteredShows, isSearchEmpty } = storeToRefs(store)

const isSearchEnabled = computed(() => {
  return userInput.value.length > 0 && !props.disabledFilteredShows
})

const resultOrResults = computed(() => {
  return filteredShows.value.length === 1 ? 'result' : 'results'
})
</script>

<template>
  <div class="media-library l-container">
    <h2 v-if="isSearchEmpty" class="section-title">
      {{ sectionTitle }}
    </h2>
    <h2 v-if="isSearchEnabled" class="section-title">
      Found {{ filteredShows.length }} {{ resultOrResults }} for '{{ userInput }}'
    </h2>

    <div v-if="isSearchEmpty" class="media-library-group l-grid">
      <MediaContent v-for="media in mediaList" :key="media.id" v-bind="media" />
    </div>

    <div v-if="isSearchEnabled" class="media-library-group l-grid">
      <MediaContent v-for="media in filteredShows" :key="media.id" v-bind="media" />
    </div>
  </div>
</template>
