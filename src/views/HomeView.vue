<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaContent from '@/components/MediaContent.vue'
import MediaSection from '@/components/MediaSection.vue'
import RightArrowIcon from '@/components/icons/RightArrowIcon.vue'
import LeftArrowIcon from '@/components/icons/LeftArrowIcon.vue'

const store = useMediaStore()
const { shows, userInput } = storeToRefs(store)

const trendingShows = shows.value.filter((show) => show.isTrending)
const recommendedShows = shows.value.filter((show) => !show.isTrending)

const mediaScroller = ref<HTMLDivElement | null>(null)
const isPrevButtonShown = ref(false)
const isNextButtonShown = ref(true)

const scrollLeft = () => {
  mediaScroller.value?.scrollBy({ left: -400, behavior: 'smooth' })
}

const scrollRight = () => {
  mediaScroller.value?.scrollBy({ left: 400, behavior: 'smooth' })
}

const checkButtonsVisibility = () => {
  const maxScrollLeft =
    (mediaScroller.value?.scrollWidth || 0) - (mediaScroller.value?.clientWidth || 0)

  if (mediaScroller.value?.scrollLeft === 0) {
    isPrevButtonShown.value = false
  } else if ((mediaScroller.value?.scrollLeft || 0) >= 187) {
    isPrevButtonShown.value = true
  }

  if ((mediaScroller.value?.scrollLeft || 0) >= maxScrollLeft) {
    isNextButtonShown.value = false
  } else {
    isNextButtonShown.value = true
  }
}
</script>

<template>
  <div v-if="userInput.length === 0" class="trending">
    <h2 class="section-title l-container">Trending</h2>

    <div class="trending-media-container">
      <button
        v-if="isPrevButtonShown"
        class="trending-media-scroller-left-button"
        @click="scrollLeft"
      >
        <LeftArrowIcon />
      </button>

      <div
        ref="mediaScroller"
        class="trending-media-scroller l-grid snaps-inline"
        @scroll="checkButtonsVisibility"
      >
        <MediaContent
          v-for="(media, index) in trendingShows"
          :key="index"
          :title="media.title"
          :thumbnail-url="media.thumbnail.trending?.large"
          :year="media.year"
          :category="media.category"
          :rating="media.rating"
        />
      </div>

      <button
        v-if="isNextButtonShown"
        @click="scrollRight"
        class="trending-media-scroller-right-button"
      >
        <RightArrowIcon />
      </button>
    </div>
  </div>

  <MediaSection section-title="Recommended for you" :media-list="recommendedShows" />
</template>

<style lang="scss">
.snaps-inline {
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: 1rem;
}

.snaps-inline > * {
  scroll-snap-align: start;
}

@media screen and (min-width: 1024px) {
  .snaps-inline > * {
    scroll-snap-align: center;
  }
}

.section-title {
  font-size: var(--font-size-xl);
  line-height: revert;
  letter-spacing: -0.31px;
  margin-bottom: var(--space-content-gap-1);
}

.trending-media-container {
  position: relative;

  &:hover {
    .trending-media-scroller-left-button,
    .trending-media-scroller-right-button {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
}

.trending-media-scroller {
  padding: 0 1rem;
  grid-auto-flow: column;
  grid-auto-columns: 15rem;
  gap: 1rem;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  width: 100vw;
  height: 8.75rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &-right-button,
  &-left-button {
    position: absolute;
    background-color: hsla(0, 0%, 0%, 0.3);
    top: 0;
    bottom: 0;
    width: 96px;
    z-index: 2;
    border: none;
    opacity: 0;

    svg {
      width: 2rem;
      height: 2rem;
      fill: var(--color-neutral-white);
    }
  }

  &-left-button {
    left: 0;
  }

  &-right-button {
    right: 0;
  }
}
</style>
