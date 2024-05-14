<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'
import SectionSkeleton from '@/components/SectionSkeleton.vue'

const mediaStore = useMediaStore()
const { shows, isLoading } = storeToRefs(mediaStore)
const { resetShows } = mediaStore

const movies = computed(() => shows.value.filter((show) => show.category === 'Movie'))
shows.value = movies.value

onBeforeUnmount(() => resetShows())
</script>

<template>
  <SectionSkeleton v-if="isLoading" />
  <MediaSection v-else section-title="Movies" :media-list="movies" />
</template>
