<script setup lang="ts">
import { ref } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const movieMedia = data.value.filter((media) => media.category === 'Movie')
</script>

<template>
  <SearchInput placeholder="Search for movies" />
  <div class="recommended l-container">
    <h2 class="section-title">Movies</h2>

    <div class="recommended-group l-grid">
      <MediaContent
        class="media-recommended"
        v-for="(media, index) in movieMedia"
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
