<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'
import SectionSkeleton from '@/components/SectionSkeleton.vue'

const mediaStore = useMediaStore()
const { allShows, shows, isLoading } = storeToRefs(mediaStore)

const movies = computed(() => allShows.value.filter((show) => show.category === 'Movie'))

watchEffect(() => (shows.value = movies.value))
</script>

<template>
  <SectionSkeleton v-if="isLoading" />
  <MediaSection v-else section-title="Movies" :media-list="movies" />
</template>
