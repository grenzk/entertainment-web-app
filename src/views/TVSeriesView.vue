<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const tvSeriesMedia = data.value.filter((media) => media.category === 'TV Series')

onMounted(() => {
  changeGridRows()
  window.addEventListener('resize', changeGridRows)
})

onUnmounted(() => {
  resetGrid()
  window.removeEventListener('resize', changeGridRows)
})
</script>

<template>
  <SearchInput placeholder="Search for TV series" />
  <div class="media-library l-container">
    <h2 class="section-title">TV Series</h2>

    <div class="media-library-group l-grid">
      <MediaContent
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
