import { AxisType } from './Axis'
import { arrayLast, arrayLastIndex, mathAbs } from './utils'

export type SlideSizesType = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
}

export function SlideSizes(
  axis: AxisType,
  slides: HTMLElement[],
  slideRects: DOMRect[],
  loop: boolean,
): SlideSizesType {
  const { measureSize, startEdge, endEdge } = axis
  const slideSizes = slideRects.map(measureSize)
  const slideSizesWithGaps = measureWithGaps()

  function measureWithGaps(): number[] {
    return slideRects
      .map((rect, index, rects) => {
        const isLast = index === arrayLastIndex(rects)
        const style = window.getComputedStyle(arrayLast(slides))
        const endGap = parseFloat(style.getPropertyValue(`margin-${endEdge}`))
        if (isLast) return slideSizes[index] + (loop ? endGap : 0)
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
