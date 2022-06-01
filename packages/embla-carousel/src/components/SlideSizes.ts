import { AxisType } from './Axis'
import { arrayLast, arrayLastIndex, mathAbs } from './utils'

export type SlideSizesType = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
}

export function SlideSizes(
  axis: AxisType,
  containerRect: DOMRect,
  slideRects: DOMRect[],
  slides: HTMLElement[],
  includeEdgeGap: boolean,
): SlideSizesType {
  const { measureSize, startEdge, endEdge } = axis
  const startGap = measureStartGap()
  const endGap = measureEndGap()
  const slideSizes = slideRects.map(measureSize)
  const slideSizesWithGaps = measureWithGaps()

  function measureStartGap(): number {
    if (!includeEdgeGap) return 0
    const slideRect = slideRects[0]
    return mathAbs(containerRect[startEdge] - slideRect[startEdge])
  }

  function measureEndGap(): number {
    if (!includeEdgeGap) return 0
    const style = window.getComputedStyle(arrayLast(slides))
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`))
  }

  function measureWithGaps(): number[] {
    return slideRects
      .map((rect, index, rects) => {
        const isFirst = !index
        const isLast = index === arrayLastIndex(rects)
        if (isFirst) return slideSizes[index] + startGap
        if (isLast) return slideSizes[index] + endGap
        return rects[index + 1][startEdge] - rect[startEdge]
      })
      .map(mathAbs)
  }

  const self: SlideSizesType = {
    slideSizes,
    slideSizesWithGaps,
  }
  return self
}
