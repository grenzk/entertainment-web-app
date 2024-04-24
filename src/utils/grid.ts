import { onMounted, onUnmounted } from 'vue'

const gridContainer = document.getElementById('app') as HTMLDivElement

export const adjustGridForContentPages = () => {
  gridContainer.style.gridTemplateRows = '5rem 3rem'

  if (window.innerWidth >= 768) {
    gridContainer.style.gridTemplateRows = '8.063rem 4.063rem'
  }

  if (window.innerWidth >= 1024) {
    gridContainer.style.gridTemplateRows = '7.15rem'
  }
}

export const adjustGridForAuthPages = () => {
  gridContainer.style.gridTemplate = '8.25rem / auto'
  gridContainer.style.justifyItems = 'center'
  gridContainer.style.alignItems = 'start'
}

export const useGrid = (gridHandler: () => void) => {
  const resetGrid = () => {
    gridContainer.style.gridTemplateRows = ''
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
