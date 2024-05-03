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

  const resetShows = () => {
    shows.value = allShows.value
    userInput.value = ''
  }

  const fetchMedia = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.media, {
        headers: {
          authorization: authStore.authToken
        }
      })
      allShows.value = response.data
      shows.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.bookmarks, {
        headers: {
          authorization: authStore.authToken
        }
      })
      bookmarks.value = response.data.map((item: { medium_id: number }) => item.medium_id)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleBookmark = async (id: number) => {
    try {
      const hasBookmark = computed(() => bookmarks.value.includes(id))

      if (hasBookmark.value) {
        await axios.delete(`${API_ENDPOINTS.bookmarks}/${id}`, {
          headers: {
            authorization: authStore.authToken
          }
        })
      } else {
        await axios.post(
          API_ENDPOINTS.bookmarks,
          {
            medium_id: id
          },
          {
            headers: {
              authorization: authStore.authToken
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

  fetchMedia()
  fetchBookmarks()

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
