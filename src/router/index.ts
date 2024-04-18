import { createRouter, createWebHistory } from 'vue-router'

import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import MoviesView from '@/views/MoviesView.vue'
import TVSeriesView from '@/views/TVSeriesView.vue'
import BookmarksView from '@/views/BookmarksView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView
    },
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
