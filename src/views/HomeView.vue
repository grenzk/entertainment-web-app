<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import MediaContent from '@/components/MediaContent.vue'
</script>

<template>
  <SearchInput />
  <div class="trending">
    <h2 class="section-title l-container">Trending</h2>

    <div class="trending-media-scroller l-grid snaps-inline">
      <MediaContent />
      <MediaContent />
      <MediaContent />
      <MediaContent />
      <MediaContent />
      <MediaContent />
      <MediaContent />
    </div>
  </div>
  <div class="recommended l-container">
    <h2 class="section-title">Recommended for you</h2>

    <div class="recommended-group l-grid">
      <MediaContent class="media-recommended" />
      <MediaContent class="media-recommended" />
      <MediaContent class="media-recommended" />
      <MediaContent class="media-recommended" />
      <MediaContent class="media-recommended" />
      <MediaContent class="media-recommended" />
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
