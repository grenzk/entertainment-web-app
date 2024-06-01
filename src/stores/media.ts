import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { http } from '@/services/axios-config'
import { API_ENDPOINTS } from '@/services/api-config'

export const useMediaStore = defineStore('media', () => {
  const authStore = useAuthStore()

  const allShows = ref<MediaItem[]>([])
  const shows = ref<MediaItem[]>([])
  const userInput = ref('')
  const isLoading = ref(false)

  const filteredShows = computed(() => {
    return shows.value.filter((show) => {
      return show.title.toLowerCase().includes(userInput.value.toLowerCase())
    })
  })

  const bookmarkedShows = computed(() => {
    return allShows.value.filter((show) => show.isBookmarked)
  })

  const isSearchEmpty = computed(() => {
    return userInput.value.length === 0
  })

  const $reset = (): void => {
    allShows.value = []
    shows.value = []
    userInput.value = ''
  }

  const fetchMedia = async (): Promise<void> => {
    try {
      const response = await http.get<MediaItem[]>(API_ENDPOINTS.media)

      allShows.value = response.data
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  const toggleBookmark = async (id: number): Promise<void> => {
    try {
      const hasBookmark = computed(() => bookmarkedShows.value.some((show) => show.id === id))

      if (hasBookmark.value) {
        await http.delete<Bookmark>(`${API_ENDPOINTS.bookmarks}/${id}`)
      } else {
        await http.post<Bookmark>(API_ENDPOINTS.bookmarks, {
          medium_id: id
        })
      }

      fetchMedia()
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  watchEffect(async () => {
    if (authStore.isLoggedIn) {
      isLoading.value = true
      try {
        await fetchMedia()
      } catch (error) {
        authStore.showErrorMessage(error)
      } finally {
        isLoading.value = false
      }
    }
  })

  return {
    allShows,
    shows,
    userInput,
    isLoading,
    filteredShows,
    bookmarkedShows,
    isSearchEmpty,
    $reset,
    fetchMedia,
    toggleBookmark
  }
})
