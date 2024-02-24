<script setup lang="ts">
import EmptyBookmarkIcon from '@/components/icons/EmptyBookmarkIcon.vue'
import MovieCategoryIcon from '@/components/icons/MovieCategoryIcon.vue'
import TVCategoryIcon from '@/components/icons/TVCategoryIcon.vue'

defineProps<{
  title: string
  thumbnailUrl: string | undefined
  year: number
  category: string
  rating: string
  // isBookmarked: boolean
  // isTrending: boolean
}>()
</script>

<template>
  <div class="media">
    <img class="media-img" :src="thumbnailUrl" alt="Movie Image" />

    <div class="media-gradient-overlay"></div>
    <div class="media-bookmark-button l-flex"><EmptyBookmarkIcon /></div>

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
  </div>
</template>

<style lang="scss">
.media {
  overflow: hidden;
  border-radius: var(--border-radius-xs);
  position: relative;

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
  }

  &-bookmark-button {
    background-color: hsla(223, 30%, 9%, 0.5);
    border-radius: var(--border-radius-round);
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
}

.media.media-recommended > .media {
  overflow: visible;

  &-img {
    border-radius: var(--border-radius-xs);
    margin-bottom: 0.5rem;
    height: 6.875rem;
    width: 100%;
  }

  &-gradient-overlay {
    display: none;
  }

  &-info {
    position: static;

    &-tags {
      gap: 0.375rem;
    }

    h3 {
      font-size: var(--font-size-s);
    }
  }
}
</style>
