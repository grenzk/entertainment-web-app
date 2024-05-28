import { onMounted, onUnmounted } from 'vue'

const gridContainer = document.getElementById('app') as HTMLDivElement

export const adjustGridForAuthPages = (): void => {
  gridContainer.style.gridTemplate = '8.25rem / auto'
  gridContainer.style.placeItems = 'start center'

  if (window.innerWidth >= 768) {
    gridContainer.style.gridTemplateRows = '11.625rem'
  }
}

export const useGrid = (gridHandler: () => void): void => {
  const resetGrid = () => {
    gridContainer.style.gridTemplate = ''
    gridContainer.style.placeItems = ''
  }

  onMounted(() => {
    gridHandler()
    window.addEventListener('resize', gridHandler)
  })

  onUnmounted(() => {
    resetGrid()
    window.removeEventListener('resize', gridHandler)
  })
}
