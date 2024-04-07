<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { changeGridRows, resetGrid } from '@/utils/grid'

import SearchInput from '@/components/SearchInput.vue'

import LogoIcon from '@/components/icons/LogoIcon.vue'
import NavHomeIcon from '@/components/icons/NavHomeIcon.vue'
import NavMoviesIcon from '@/components/icons/NavMoviesIcon.vue'
import NavTVSeriesIcon from '@/components/icons/NavTVSeriesIcon.vue'
import NavBookmarksIcon from '@/components/icons/NavBookmarksIcon.vue'

const route = useRoute()

const searchPlaceholders: Record<string, string> = {
  '/': 'Search for movies or TV series',
  '/movies': 'Search for movies',
  '/tv-series': 'Search for TV series',
  '/bookmarks': 'Search for bookmarked shows'
}

const searchPlaceholder = computed(() => {
  return searchPlaceholders[route.path]
})

watchEffect(() => {
  if (route.path !== '/') {
    changeGridRows()
    window.addEventListener('resize', changeGridRows)
  } else {
    resetGrid()
    window.removeEventListener('resize', changeGridRows)
  }
})
</script>

<template>
  <header class="header">
    <div class="header-group l-flex l-container">
      <a href="/" class="header-logo"><LogoIcon class="header-logo-svg-icon" /></a>
      <nav class="header-nav">
        <ul class="header-nav-list l-flex">
          <li class="header-nav-item">
            <RouterLink to="/" class="header-nav-link">
              <NavHomeIcon class="header-nav-link-svg-icon" />
            </RouterLink>
          </li>
          <li class="header-nav-item">
            <RouterLink to="/movies" class="header-nav-link">
              <NavMoviesIcon class="header-nav-link-svg-icon" />
            </RouterLink>
          </li>
          <li class="header-nav-item">
            <RouterLink to="/tv-series" class="header-nav-link">
              <NavTVSeriesIcon class="header-nav-link-svg-icon" />
            </RouterLink>
          </li>
          <li class="header-nav-item">
            <RouterLink to="/bookmarks" class="header-nav-link">
              <NavBookmarksIcon class="header-nav-link-svg-icon" />
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="header-avatar">
        <img src="@/assets/avatars/image-avatar.png" alt="User Avatar" />
      </div>
    </div>
  </header>

  <SearchInput :placeholder="searchPlaceholder" />

  <RouterView />
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template: 5rem 3rem 12.813rem / 1fr;
}

.header-group.l-container {
  margin-left: 0;
  margin-right: 0;
}

.header {
  &-group {
    height: var(--header-height);
    padding: 0 1rem;
    background-color: var(--color-primary-semi-dark-blue);
    align-items: center;
    justify-content: space-between;
  }

  &-logo {
    width: 1.563rem;
    height: 1.25rem;
  }

  &-logo-svg-icon,
  &-nav-link-svg-icon,
  &-nav-link {
    width: 100%;
    height: 100%;
  }

  &-nav-list {
    gap: var(--space-nav-links-gap);
  }

  &-nav-item {
    width: 1rem;
    height: 1rem;
  }

  &-nav-link {
    display: inline-block;

    &:hover {
      svg path {
        fill: var(--color-primary-red);
      }
    }
  }

  &-nav-link.router-link-active {
    svg path {
      fill: var(--color-neutral-white);
    }
  }

  &-avatar {
    width: 1.5rem;
    border: 1px solid var(--color-neutral-white);
    border-radius: var(--border-radius-round);
    cursor: pointer;
  }
}
</style>
