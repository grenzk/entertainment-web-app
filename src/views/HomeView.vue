<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useMediaStore } from '@/stores/media'

import MediaContent from '@/components/MediaContent.vue'
import MediaSection from '@/components/MediaSection.vue'
import SectionSkeleton from '@/components/SectionSkeleton.vue'
import RightArrowIcon from '@/components/icons/RightArrowIcon.vue'
import LeftArrowIcon from '@/components/icons/LeftArrowIcon.vue'

const mediaStore = useMediaStore()
const { allShows, shows, isLoading, isSearchEmpty } = storeToRefs(mediaStore)

const trendingShows = computed(() => allShows.value.filter((show) => show.isTrending))
const recommendedShows = computed(() => allShows.value.filter((show) => !show.isTrending))

const mediaScroller = ref<HTMLDivElement | null>(null)
const isPrevButtonShown = ref(false)
const isNextButtonShown = ref(true)

const scrollLeft = (): void => {
  mediaScroller.value?.scrollBy({ left: -400, behavior: 'smooth' })
}

const scrollRight = (): void => {
  mediaScroller.value?.scrollBy({ left: 400, behavior: 'smooth' })
}

const checkButtonsVisibility = (): void => {
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

watchEffect(() => (shows.value = allShows.value))
</script>

<template>
  <main class="home">
    <section v-if="isSearchEmpty" class="trending">
      <QSkeleton
        v-if="isLoading"
        class="section-title custom-skeleton l-container"
        width="150px"
        animation="fade"
      />
      <h2 v-else class="section-title l-container">Trending</h2>
      <div class="trending-media-container">
        <button
          v-if="!isLoading && isPrevButtonShown"
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
          <template v-if="isLoading">
            <QSkeleton class="custom-skeleton" v-for="num in 5" :key="num" animation="fade" />
          </template>
          <template v-else>
            <MediaContent v-for="media in trendingShows" :key="media.id" v-bind="media" />
          </template>
        </div>
        <button
          v-if="!isLoading && isNextButtonShown"
          @click="scrollRight"
          class="trending-media-scroller-right-button"
        >
          <RightArrowIcon />
        </button>
      </div>
    </section>

    <SectionSkeleton v-if="isLoading" />
    <MediaSection v-else section-title="Recommended for you" :media-list="recommendedShows" />
  </main>
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
    display: none;
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

    @media screen and (min-width: 1024px) {
      display: block;
    }
  }

  &-left-button {
    left: 0;
  }

  &-right-button {
    right: 0;
  }
}

.home {
  grid-row: span 2;
  display: grid;
  grid-template-rows: 12.813rem;
}
</style>
