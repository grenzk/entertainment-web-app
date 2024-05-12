import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { http } from '@/services/axios-config'
import { API_ENDPOINTS } from '@/services/api-config'

export const useMediaStore = defineStore('media', () => {
  const authStore = useAuthStore()

  const allShows = ref<MediaItem[]>([])
  const shows = ref<MediaItem[]>([])
  const bookmarks = ref<number[]>([])
  const userInput = ref('')

  const filteredShows = computed(() => {
    return shows.value.filter((show) => {
      return show.title.toLowerCase().includes(userInput.value.toLowerCase())
    })
  })

  const isSearchEmpty = computed(() => {
    return userInput.value.length === 0
  })

  const resetShows = (): void => {
    shows.value = allShows.value
    userInput.value = ''
  }

  const fetchMedia = async (): Promise<void> => {
    try {
      const response = await http.get<MediaItem[]>(API_ENDPOINTS.media)

      allShows.value = response.data
      shows.value = response.data
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  const fetchBookmarks = async (): Promise<void> => {
    try {
      const response = await http.get<Bookmark[]>(API_ENDPOINTS.bookmarks)

      bookmarks.value = response.data.map((item: Bookmark) => item.medium_id)
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  const toggleBookmark = async (id: number): Promise<void> => {
    try {
      const hasBookmark = computed(() => bookmarks.value.includes(id))

      if (hasBookmark.value) {
        await http.delete<Bookmark>(`${API_ENDPOINTS.bookmarks}/${id}`)
      } else {
        await http.post<Bookmark>(API_ENDPOINTS.bookmarks, {
          medium_id: id
        })
      }

      fetchMedia()
      fetchBookmarks()
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  return {
    allShows,
    shows,
    bookmarks,
    userInput,
    filteredShows,
    isSearchEmpty,
    resetShows,
    fetchMedia,
    fetchBookmarks,
    toggleBookmark
  }
})
