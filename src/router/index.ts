import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import TVSeriesView from '@/views/TVSeriesView.vue'
import BookmarksView from '@/views/BookmarksView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView
    },
    {
      path: '/tv-series',
      name: 'tv-series',
      component: TVSeriesView
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: BookmarksView
    }
  ]
})
