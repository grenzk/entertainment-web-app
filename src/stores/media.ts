import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Axios from 'axios'

export const useMediaStore = defineStore('media', () => {
  const data = ref<MediaItem[]>([])
  const shows = ref<MediaItem[]>([])
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

  const fetchMediaData = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:3000/api/v1/media')
      data.value = response.data
      shows.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  fetchMediaData()

  return { shows, userInput, filteredShows, resetShows, fetchMediaData }
})
