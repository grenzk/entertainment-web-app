<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const bookmarkedMovies = data.value.filter((media) => {
  return media.isBookmarked && media.category === 'Movie'
})
const bookmarkedTvSeries = data.value.filter((media) => {
  return media.isBookmarked && media.category === 'TV Series'
})

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
  <SearchInput placeholder="Search for bookmarked shows" />
  <div class="media-library bookmarked-movies l-container">
    <h2 class="section-title">Bookmarked Movies</h2>

    <div class="media-library-group l-grid">
      <MediaContent
        v-for="(media, index) in bookmarkedMovies"
        :key="index"
        :title="media.title"
        :thumbnail-url="media.thumbnail.regular?.large"
        :year="media.year"
        :category="media.category"
        :rating="media.rating"
      />
    </div>
  </div>
  <div class="media-library bookmarked-tv-series l-container">
    <h2 class="section-title">Bookmarked TV Series</h2>

    <div class="media-library-group l-grid">
      <MediaContent
        v-for="(media, index) in bookmarkedTvSeries"
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

<style lang="scss">
.media-library.bookmarked-movies {
  padding-bottom: 1.5rem;
}
</style>
