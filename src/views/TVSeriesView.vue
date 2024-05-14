<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'
import SectionSkeleton from '@/components/SectionSkeleton.vue'

const mediaStore = useMediaStore()
const { shows, isLoading } = storeToRefs(mediaStore)
const { resetShows } = mediaStore

const tvSeries = computed(() => shows.value.filter((show) => show.category === 'TV Series'))
shows.value = tvSeries.value

onBeforeUnmount(() => resetShows())
</script>

<template>
  <SectionSkeleton v-if="isLoading" />
  <MediaSection v-else section-title="TV Series" :media-list="tvSeries" />
</template>
