import { createRouter, createWebHistory } from 'vue-router'

import ContentLayout from '@/components/ContentLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'

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
      component: AuthLayout,
      children: [{ path: '', name: 'sign-up', component: SignUpView }]
    },
    {
      path: '/sign-in',
      component: AuthLayout,
      children: [{ path: '', name: 'sign-in', component: SignInView }]
    },
    {
      path: '/',
      component: ContentLayout,
      children: [{ path: '', name: 'home', component: HomeView }]
    },
    {
      path: '/movies',
      component: ContentLayout,
      children: [{ path: '', name: 'movies', component: MoviesView }]
    },
    {
      path: '/tv-series',
      component: ContentLayout,
      children: [{ path: '', name: 'tv-series', component: TVSeriesView }]
    },
    {
      path: '/bookmarks',
      component: ContentLayout,
      children: [{ path: '', name: 'bookmarks', component: BookmarksView }]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
