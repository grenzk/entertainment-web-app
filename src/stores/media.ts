import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
import { API_ENDPOINTS } from '@/apiConfig'

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
      const response = await axios.get<MediaItem[]>(API_ENDPOINTS.media, {
        headers: {
          Authorization: authStore.authToken
        }
      })

      allShows.value = response.data
      shows.value = response.data
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  const fetchBookmarks = async (): Promise<void> => {
    try {
      const response = await axios.get<Bookmark[]>(API_ENDPOINTS.bookmarks, {
        headers: {
          Authorization: authStore.authToken
        }
      })

      bookmarks.value = response.data.map((item: Bookmark) => item.medium_id)
    } catch (error) {
      authStore.showErrorMessage(error)
    }
  }

  const toggleBookmark = async (id: number): Promise<void> => {
    try {
      const hasBookmark = computed(() => bookmarks.value.includes(id))

      if (hasBookmark.value) {
        await axios.delete<Bookmark>(`${API_ENDPOINTS.bookmarks}/${id}`, {
          headers: {
            Authorization: authStore.authToken
          }
        })
      } else {
        await axios.post<Bookmark>(
          API_ENDPOINTS.bookmarks,
          {
            medium_id: id
          },
          {
            headers: {
              Authorization: authStore.authToken
            }
          }
        )
      }

      fetchMedia()
      fetchBookmarks()
    } catch (error) {
      console.error(error)
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
