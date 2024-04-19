const gridContainer = document.getElementById('app') as HTMLDivElement

export const adjustGridForAuthPages = () => {
  gridContainer.style.gridTemplate = '8.25rem / auto'
  gridContainer.style.justifyItems = 'center'
  gridContainer.style.alignItems = 'start'
}

export const changeGridRows = () => {
  gridContainer.style.gridTemplateRows = '5rem 3rem'

  if (window.innerWidth >= 768) {
    gridContainer.style.gridTemplateRows = '8.063rem 4.063rem'
  }

  if (window.innerWidth >= 1024) {
    gridContainer.style.gridTemplateRows = '7.15rem'
  }
}

export const resetGrid = () => {
  gridContainer.style.gridTemplateRows = ''
}
