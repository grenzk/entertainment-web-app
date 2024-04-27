<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaSection from '@/components/MediaSection.vue'

const store = useMediaStore()
const { shows } = storeToRefs(store)
const { resetShows } = store

const tvSeries = computed(() => shows.value.filter((show) => show.category === 'TV Series'))
shows.value = tvSeries.value

onBeforeUnmount(() => resetShows())
</script>

<template>
  <MediaSection section-title="TV Series" :media-list="tvSeries" />
</template>
