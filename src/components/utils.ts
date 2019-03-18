export function rectWidth(node: HTMLElement): number {
  return node.getBoundingClientRect().width
}

export function map(
  value: number,
  iStart: number,
  iStop: number,
  oStart: number,
  oStop: number,
): number {
  return (
    oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart))
  )
}

export function debounce(
  callback: () => void,
  time: number,
): () => void {
  const timeout = { id: 0 }
  return (): void => {
    window.clearTimeout(timeout.id)
    timeout.id = window.setTimeout(callback, time) || 0
  }
}

export function arrayFromCollection(
  nodeList: HTMLCollection,
): HTMLElement[] {
  const array: HTMLElement[] = []
  for (const node of nodeList) {
    array.push(node as HTMLElement)
  }
  return array
}
