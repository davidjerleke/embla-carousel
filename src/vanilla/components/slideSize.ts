import { Axis } from './axis'
import { PxToPercent } from './pxToPercent'

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
    // const sizesInPx = rects.map(measureSize)
    // use pxToPercent only once, change sizesWithoutGaps(rects)[index] --> sizesInPx[index]
    return rects
      .map((slideRect, index) => {
        if (index !== rects.length - 1) {
          return pxToPercent.measure(
            rects[index + 1][startEdge] - slideRect[startEdge],
          )
        }
        if (!loop) return measureWithoutGaps(rects)[index]
        return (
          measureWithoutGaps(rects)[index] +
          pxToPercent.measure(
            parseFloat(
              window
                .getComputedStyle(slides[index])
                .getPropertyValue(`margin-${endEdge}`),
            ),
          )
        )
      })
      .map(Math.abs)
  }

  const self: SlideSize = {
    measureWithoutGaps,
    measureWithGaps,
  }
  return self
}
