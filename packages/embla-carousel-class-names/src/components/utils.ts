export function removeClass(node: HTMLElement, className: string): void {
  if (!node || !className) return
  const { classList } = node
  if (classList.contains(className)) classList.remove(className)
}

export function addClass(node: HTMLElement, className: string): void {
  if (!node || !className) return
  const { classList } = node
  if (!classList.contains(className)) classList.add(className)
}

export function nodeListToArray(nodeList: NodeListOf<Element>): HTMLElement[] {
  return <HTMLElement[]>Array.from(nodeList)
}
