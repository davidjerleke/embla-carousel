import { Axis } from './axis'
import { PxToPercent } from './pxToPercent'
import { lastIndex } from './utils'

type Params = {
  axis: Axis
  pxToPercent: PxToPercent
  loop: boolean
}

export type SlideSize = {
  measureWithoutGaps: (rects: DOMRect[]) => number[]
  measureWithGaps: (rects: DOMRect[], slides: HTMLElement[]) => number[]
}

export function SlideSize(params: Params): SlideSize {
  const { axis, pxToPercent, loop } = params
  const { measureSize, startEdge, endEdge } = axis

  function measureWithoutGaps(rects: DOMRect[]): number[] {
    const sizesInPx = rects.map(measureSize)
    return sizesInPx.map(pxToPercent.measure)
  }

  function measureWithGaps(rects: DOMRect[], slides: HTMLElement[]): number[] {
    return rects
      .map((slideRect, index) => {
        if (index === lastIndex(rects)) {
          const slideSize = rects.map(measureSize)[index]
          const slideStyle = window.getComputedStyle(slides[index])
          const endMargin = slideStyle.getPropertyValue(`margin-${endEdge}`)
          return loop ? slideSize + parseFloat(endMargin) : slideSize
        }
        return rects[index + 1][startEdge] - slideRect[startEdge]
      })
      .map(pxToPercent.measure)
      .map(Math.abs)
  }

  const self: SlideSize = {
    measureWithoutGaps,
    measureWithGaps,
  }
  return self
}
