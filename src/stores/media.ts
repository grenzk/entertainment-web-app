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

  const toggleBookmark = async (id: number, isBookmarked: boolean): Promise<void> => {
    try {
      const mediaIndex = allShows.value.findIndex((show) => show.id === id)

      allShows.value.splice(mediaIndex, 1, {
        ...allShows.value[mediaIndex],
        isBookmarked: !isBookmarked
      })

      if (isBookmarked) {
        await http.delete<Bookmark>(`${API_ENDPOINTS.bookmarks}/${id}`)
      } else {
        await http.post<Bookmark>(API_ENDPOINTS.bookmarks, {
          medium_id: id
        })
      }
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
