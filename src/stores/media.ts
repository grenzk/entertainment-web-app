import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import data from '@/assets/data.json'

export const useMediaStore = defineStore('media', () => {
  const shows = ref<MediaItem[]>(data)
  const userInput = ref('')

  const filteredShows = computed({
    get: () => {
      return shows.value.filter((show) => {
        return show.title.toLowerCase().includes(userInput.value.toLowerCase())
      })
    },

    set: (newValue: MediaItem[]) => {
      shows.value = newValue
    }
  })

  const resetShows = () => {
    shows.value = data
    userInput.value = ''
  }

  return { shows, userInput, filteredShows, resetShows }
})
