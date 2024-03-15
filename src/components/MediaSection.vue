<script setup lang="ts">
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

defineProps<{
  sectionTitle: string
  searchInput?: string
  disabledFilterSearch?: boolean
  mediaList: MediaItem[]
  filteredSearch?: MediaItem[]
}>()
</script>

<template>
  <div class="media-library l-container">
    <h2 v-if="searchInput?.length === 0 || searchInput === undefined" class="section-title">{{ sectionTitle }}</h2>
    <h2 v-if="(searchInput?.length || 0) > 0 && !disabledFilterSearch" class="section-title">
      Found {{ filteredSearch?.length }} results for '{{ searchInput }}'
    </h2>

    <div v-if="searchInput?.length === 0 || searchInput === undefined" class="media-library-group l-grid">
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

    <div
      v-if="(searchInput?.length || 0) > 0 && !disabledFilterSearch"
      class="media-library-group l-grid"
    >
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
