export type ScrollPositionType = {
  offsetTop: number
  rectTop: number
}

export const getScrollPosition = <ElementType extends HTMLElement>(
  element: ElementType | null
): ScrollPositionType => {
  if (!element) return { offsetTop: 0, rectTop: 0 }
  return {
    offsetTop: element.offsetTop,
    rectTop: element.getBoundingClientRect().top
  }
}

export const getScrollPositionDiff = (
  currentScroll: ScrollPositionType,
  previousScroll: ScrollPositionType
): number => {
  const offsetDiff = currentScroll.offsetTop - previousScroll.offsetTop
  const rectDiff = currentScroll.rectTop - previousScroll.rectTop
  return Math.abs(offsetDiff - rectDiff) > 1 ? rectDiff : offsetDiff
}
