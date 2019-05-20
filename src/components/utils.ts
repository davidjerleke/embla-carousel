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

export function arrayFromCollection(
  nodeList: HTMLCollection,
): HTMLElement[] {
  return Array.prototype.slice.call(nodeList)
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

export function groupedArray(array: any[], size: number): number[][] {
  const groups = []
  for (let i = 0; i < array.length; i += size) {
    groups.push(array.slice(i, i + size))
  }
  return groups
}
