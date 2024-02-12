<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import LogoIcon from '@/components/icons/LogoIcon.vue'
import NavHomeIcon from '@/components/icons/NavHomeIcon.vue'
import NavMoviesIcon from '@/components/icons/NavMoviesIcon.vue'
import NavTVSeriesIcon from '@/components/icons/NavTVSeriesIcon.vue'
import NavBookmarksIcon from '@/components/icons/NavBookmarksIcon.vue'
</script>

<template>
  <div>
    <a href="/"><LogoIcon /></a>
    <nav>
      <RouterLink to="/"><NavHomeIcon /></RouterLink>
      <RouterLink to="/movies"><NavMoviesIcon /></RouterLink>
      <RouterLink to="/tv-series"><NavTVSeriesIcon /></RouterLink>
      <RouterLink to="/bookmarks"><NavBookmarksIcon /></RouterLink>
    </nav>
    <div class="avatar">
      <img src="@/assets/avatars/image-avatar.png" alt="User Avatar" />
    </div>
  </div>

  <RouterView />
</template>

<style scoped></style>
