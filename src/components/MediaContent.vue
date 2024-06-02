<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import BookmarkIcon from '@/components/icons/BookmarkIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import MovieCategoryIcon from '@/components/icons/MovieCategoryIcon.vue'
import TVCategoryIcon from '@/components/icons/TVCategoryIcon.vue'

const props = defineProps<MediaItem>()

const routes = useRoute()

const mediaStore = useMediaStore()
const { isSearchEmpty } = storeToRefs(mediaStore)
const { toggleBookmark } = mediaStore

const thumbnail = computed(() => {
  if (routes.path === '/' && isSearchEmpty.value) {
    return props.isTrending ? props.thumbnails.trending : props.thumbnails.regular
  }
  return props.thumbnails.regular
})
</script>

<template>
  <div class="media">
    <div class="media-img-group">
      <img class="media-img" :src="thumbnail" :alt="title" loading="lazy" decoding="async" />

      <button class="media-play-button l-flex">
        <PlayIcon />
        <span class="media-play-button-text">Play</span>
      </button>
    </div>

    <button
      class="media-bookmark-button l-flex"
      :class="{ 'is-pressed': isBookmarked }"
      aria-label="Bookmark"
      @click="toggleBookmark(id)"
    >
      <BookmarkIcon />
    </button>

    <div class="media-info">
      <div class="media-info-tags l-flex">
        <small>{{ year }}</small>
        <small></small>
        <small v-if="category === 'Movie'"><MovieCategoryIcon /></small>
        <small v-else><TVCategoryIcon /></small>
        <small>{{ category }}</small>
        <small></small>
        <small>{{ rating }}</small>
      </div>
      <h3 class="media-info-title">{{ title }}</h3>
    </div>
    <div class="media-gradient-overlay"></div>
  </div>
</template>

<style lang="scss">
.media {
  overflow: hidden;
  border-radius: var(--border-radius-xs);
  position: relative;

  &-img-group {
    height: 100%;
    position: relative;
    cursor: pointer;

    &:hover {
      .media-img {
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }

      .media-play-button {
        opacity: 1;
        transition: opacity 0.3s ease;
      }
    }
  }

  &-play-button {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: hsla(0, 0%, 100%, 0.25);
    width: 7.313rem;
    height: 3rem;
    border-radius: var(--border-radius-l);
    border: none;
    align-items: center;
    gap: 1.188rem;
    padding: 0.563rem;
    opacity: 0;
    cursor: pointer;

    &-text {
      color: var(--color-neutral-white);
      font-size: var(--font-size-l);
      font-weight: var(--font-weight-medium);
    }
  }

  &-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &-info {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    z-index: 1;

    &-tags {
      gap: var(--space-media-info-gap);
      color: hsla(0, 0%, 100%, 0.75);
      align-items: center;

      small {
        font-size: var(--font-size-xxs);
      }

      small:nth-child(2),
      small:nth-child(5) {
        width: 0.188rem;
        height: 0.188rem;
        background-color: hsla(0, 0%, 100%, 0.75);
        border-radius: 50%;
      }

      small:nth-child(3) {
        display: inline-flex;
      }
    }

    &-title {
      font-size: var(--font-size-trending-media-title);
      font-weight: var(--font-weight-medium);
      line-height: revert;
    }
  }

  &-gradient-overlay {
    position: absolute;
    background: linear-gradient(to bottom, hsla(0, 0%, 0%, 0), hsla(0, 0%, 0%, 0.5));
    width: 100%;
    height: 50%;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
  }

  &-bookmark-button {
    background-color: hsla(223, 30%, 9%, 0.5);
    border-radius: var(--border-radius-round);
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    cursor: pointer;
    border: none;

    &:hover {
      background-color: var(--color-neutral-white);

      svg path {
        stroke: var(--color-primary-dark-blue);
      }
    }
  }

  &-bookmark-button.is-pressed {
    svg {
      fill: var(--color-neutral-white);
    }

    &:hover svg {
      fill: var(--color-primary-dark-blue);
    }
  }
}

.media-library-group .media {
  overflow: visible;

  .media-img-group {
    height: unset;
  }

  .media-img {
    border-radius: var(--border-radius-xs);
    margin-bottom: 0.5rem;
    height: 6.875rem;
  }

  .media-gradient-overlay {
    display: none;
  }

  .media-info {
    position: static;

    .media-tags {
      gap: 0.375rem;
    }

    h3 {
      font-size: var(--font-size-s);
    }
  }
}
</style>
