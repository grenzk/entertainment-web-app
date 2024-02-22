<script setup lang="ts">
import { ref } from 'vue'

import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
import mediaData from '@/assets/data.json'

const data = ref(mediaData)
const trendingMedia = data.value.filter((media) => media.isTrending)
const recommendedMedia = data.value.filter((media) => !media.isTrending)
</script>

<template>
  <SearchInput />
  <div class="trending">
    <h2 class="section-title l-container">Trending</h2>

    <div class="trending-media-scroller l-grid snaps-inline">
      <MediaContent
        v-for="(media, index) in trendingMedia"
        :key="index"
        :title="media.title"
        :thumbnail-url="media.thumbnail.trending?.large"
        :year="media.year"
        :category="media.category"
        :rating="media.rating"
      />
    </div>
  </div>
  <div class="recommended l-container">
    <h2 class="section-title">Recommended for you</h2>

    <div class="recommended-group l-grid">
      <MediaContent
        class="media-recommended"
        v-for="(media, index) in recommendedMedia"
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
.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 1rem;
}

.snaps-inline > * {
  scroll-snap-align: start;
}

.section-title {
  font-size: var(--font-size-xl);
  line-height: revert;
  letter-spacing: -0.31px;
  margin-bottom: var(--space-content-gap);
}

.trending {
  &-media-scroller {
    scrollbar-width: none;
    padding: 0 1rem;
    grid-auto-flow: column;
    grid-auto-columns: 15rem;
    gap: 1rem;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    width: 100vw;
    height: 8.75rem;
  }
}

.recommended {
  padding-bottom: 3.813rem;

  &-group {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.938rem;
  }
}
</style>
