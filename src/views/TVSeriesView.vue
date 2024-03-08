<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const tvSeriesMedia = data.value.filter((media) => media.category === 'TV Series')

onMounted(() => changeGridRows('5rem 3rem auto'))
onUnmounted(() => resetGrid())
</script>

<template>
  <SearchInput placeholder="Search for TV series" />
  <div class="recommended l-container">
    <h2 class="section-title">TV Series</h2>

    <div class="recommended-group l-grid">
      <MediaContent
        class="media-recommended"
        v-for="(media, index) in tvSeriesMedia"
        :key="index"
        :title="media.title"
        :thumbnail-url="media.thumbnail.regular?.large"
        :year="media.year"
        :category="media.category"
        :rating="media.rating"
      />
    </div>
  </div>
</template>

<style></style>
