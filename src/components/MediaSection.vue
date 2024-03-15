<script setup lang="ts">
import { computed } from 'vue'
import MediaContent from '@/components/MediaContent.vue'

interface Thumbnail {
  trending?: {
    small: string
    large: string
  }
  regular: {
    small: string
    medium?: string
    large: string
  }
}

interface MediaItem {
  title: string
  thumbnail: Thumbnail
  year: number
  category: string
  rating: string
  isBookmarked: boolean
  isTrending: boolean
}

const props = defineProps<{
  sectionTitle: string
  searchInput?: string
  disabledFilterSearch?: boolean
  mediaList: MediaItem[]
  filteredSearch?: MediaItem[]
}>()

const isSearchEmpty = computed(() => {
  return props.searchInput?.length === 0 || props.searchInput === undefined
})

const isSearchEnabled = computed(() => {
  return (props.searchInput?.length || 0) > 0 && !props.disabledFilterSearch
})

const resultOrResults = computed(() => {
  return props.filteredSearch?.length === 1 ? 'result' : 'results'
})
</script>

<template>
  <div class="media-library l-container">
    <h2 v-if="isSearchEmpty" class="section-title">
      {{ sectionTitle }}
    </h2>
    <h2 v-if="isSearchEnabled" class="section-title">
      Found {{ filteredSearch?.length }} {{ resultOrResults }} for '{{ searchInput }}'
    </h2>

    <div v-if="isSearchEmpty" class="media-library-group l-grid">
      <MediaContent
        v-for="(media, index) in mediaList"
        :key="index"
        :title="media.title"
        :thumbnail-url="media.thumbnail.regular?.large"
        :year="media.year"
        :category="media.category"
        :rating="media.rating"
      />
    </div>

    <div v-if="isSearchEnabled" class="media-library-group l-grid">
      <MediaContent
        v-for="(media, index) in filteredSearch"
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
