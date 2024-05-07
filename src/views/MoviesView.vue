<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'

const mediaStore = useMediaStore()
const { shows } = storeToRefs(mediaStore)
const { resetShows } = mediaStore

const movies = computed(() => shows.value.filter((show) => show.category === 'Movie'))
shows.value = movies.value

onBeforeUnmount(() => resetShows())
</script>

<template>
  <MediaSection section-title="Movies" :media-list="movies" />
</template>
