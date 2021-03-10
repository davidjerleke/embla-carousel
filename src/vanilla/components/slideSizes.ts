import { Axis } from './axis'
import { PxToPercent } from './pxToPercent'
import { arrayLast, lastIndex } from './utils'

type Params = {
  axis: Axis
  pxToPercent: PxToPercent
  loop: boolean
  slides: HTMLElement[]
  slideRects: DOMRect[]
}

export type SlideSizes = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
}

export function SlideSizes(params: Params): SlideSizes {
  const { axis, pxToPercent, loop, slides, slideRects } = params
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

  const self: SlideSizes = {
    slideSizes,
    slideSizesWithGaps,
  }
  return self
}
