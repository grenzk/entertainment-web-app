const gridContainer = document.getElementById('app') as HTMLElement

export const changeGridRows = (rows: string) => {
  gridContainer.style.gridTemplateRows = `${rows}`
}

export const resetGrid = () => {
  gridContainer.style.gridTemplateRows = ''
}
