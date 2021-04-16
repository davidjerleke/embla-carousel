import { AxisType } from './axis'
import { PxToPercentType } from './pxToPercent'
import { arrayLast, lastIndex } from './utils'

export type SlideSizesType = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
}

export function SlideSizes(
  axis: AxisType,
  pxToPercent: PxToPercentType,
  slides: HTMLElement[],
  slideRects: DOMRect[],
  loop: boolean,
): SlideSizesType {
  const { measureSize, startEdge, endEdge } = axis
  const sizesInPx = slideRects.map(measureSize)
  const slideSizes = sizesInPx.map(pxToPercent.measure)
  const slideSizesWithGaps = measureWithGaps()

  function measureWithGaps(): number[] {
    return slideRects
      .map((rect, index, rects) => {
        const isLast = index === lastIndex(rects)
        const style = window.getComputedStyle(arrayLast(slides))
        const endGap = parseFloat(style.getPropertyValue(`margin-${endEdge}`))
        if (isLast) return sizesInPx[index] + (loop ? endGap : 0)
        return rects[index + 1][startEdge] - rect[startEdge]
      })
      .map(pxToPercent.measure)
      .map(Math.abs)
  }

  const self: SlideSizesType = {
    slideSizes,
    slideSizesWithGaps,
  }
  return self
}
