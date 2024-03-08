<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
  <SearchInput placeholder="Search for bookmarked shows" />
  <div class="recommended l-container">
    <h2 class="section-title">Bookmarked Movies</h2>

    <div class="recommended-group l-grid">
      <MediaContent
        class="media-recommended"
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
  <div class="recommended l-container">
    <h2 class="section-title">Bookmarked TV Series</h2>

    <div class="recommended-group l-grid">
      <MediaContent
        class="media-recommended"
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

<style></style>
