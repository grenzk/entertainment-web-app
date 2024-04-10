import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMediaStore = defineStore('media', () => {
  const data = ref<MediaItem[]>([])
  const shows = ref<MediaItem[]>([])
  const bookmarks = ref<number[]>([])
  const userInput = ref('')

  const filteredShows = computed(() => {
    return shows.value.filter((show) => {
      return show.title.toLowerCase().includes(userInput.value.toLowerCase())
    })
  })

  const resetShows = () => {
    shows.value = data.value
    userInput.value = ''
  }

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/bookmarks')
      bookmarks.value = response.data.map((item: { medium_id: number }) => item.medium_id)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMediaData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/media')
      data.value = response.data
      shows.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  fetchMediaData()
  fetchBookmarks()

  return {
    shows,
    userInput,
    bookmarks,
    filteredShows,
    resetShows,
    fetchMediaData,
    fetchBookmarks
  }
})
