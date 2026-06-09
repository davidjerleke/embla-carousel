/* CONSTS */
const DEFAULT_SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: 'instant',
  block: 'start'
}

/* UTILS */
export function scrollToHash(hash: string | `#${string}`): void {
  const hashOrEmpty = hash || ''

  const id = hashOrEmpty.replace('#', '')
  const element = document.getElementById(id)

  if (!element) return
  element.scrollIntoView(DEFAULT_SCROLL_OPTIONS)
}
