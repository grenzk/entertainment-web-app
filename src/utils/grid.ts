const gridContainer = document.getElementById('app') as HTMLElement

export const changeGridRows = () => {
  gridContainer.style.gridTemplateRows = '5rem 3rem auto'

  if (window.innerWidth >= 768) {
    gridContainer.style.gridTemplateRows = '8.063rem 4.063rem auto'
  }

  if (window.innerWidth >= 1024) {
    gridContainer.style.gridTemplateRows = '8.125rem auto'
  }
}

export const resetGrid = () => {
  gridContainer.style.gridTemplateRows = ''
}
