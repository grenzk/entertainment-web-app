import { onMounted, onUnmounted } from 'vue'

const gridContainer = document.getElementById('app') as HTMLDivElement

export const adjustGridForContentPages = (): void => {
  gridContainer.style.gridTemplateRows = '5rem 3rem'

  if (window.innerWidth >= 768) {
    gridContainer.style.gridTemplateRows = '8.063rem 4.063rem'
  }

  if (window.innerWidth >= 1024) {
    gridContainer.style.gridTemplateRows = '7.15rem'
  }
}

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
