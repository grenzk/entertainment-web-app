import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const MEDIA_API_ENDPOINT = import.meta.env.VITE_MEDIA_API_ENDPOINT
const BOOKMARKS_API_ENDPOINT = import.meta.env.VITE_BOOKMARKS_API_ENDPOINT

export const useMediaStore = defineStore('media', () => {
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
      const response = await axios.get(MEDIA_API_ENDPOINT)
      allShows.value = response.data
      shows.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(BOOKMARKS_API_ENDPOINT)
      bookmarks.value = response.data.map((item: { medium_id: number }) => item.medium_id)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleBookmark = async (id: number) => {
    try {
      const hasBookmark = computed(() => bookmarks.value.includes(id))

      if (hasBookmark.value) {
        await axios.delete(`${BOOKMARKS_API_ENDPOINT}/${id}`)
      } else {
        await axios.post(BOOKMARKS_API_ENDPOINT, {
          medium_id: id
        })
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
