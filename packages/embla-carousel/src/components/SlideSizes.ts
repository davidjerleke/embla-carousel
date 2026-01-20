import { AxisType } from './Axis'
import { NodeHandlerType } from './NodeHandler'
import { NodeRectType } from './NodeHandler'
import { arrayIsLastIndex, arrayLast, mathAbs } from './utils'

export type SlideSizesType = {
  slideSizes: number[]
  slideSizesWithGaps: number[]
  startGap: number
  endGap: number
}

export function SlideSizes(
  axis: AxisType,
  containerRect: NodeRectType,
  slideRects: NodeRectType[],
  slides: HTMLElement[],
  readEdgeGap: boolean,
  nodeHandler: NodeHandlerType
): SlideSizesType {
  const { ownerWindow } = nodeHandler
  const { getSize, startEdge, endEdge } = axis
  const withEdgeGap = slideRects[0] && readEdgeGap && ownerWindow
  const startGap = getStartGap()
  const endGap = getEndGap()
  const slideSizes = slideRects.map(getSize)
  const slideSizesWithGaps = getSlideSizesWithGaps()

  function getStartGap(): number {
    if (!withEdgeGap) return 0
    const slideRect = slideRects[0]
    return mathAbs(containerRect[startEdge] - slideRect[startEdge])
  }

  function getEndGap(): number {
    if (!withEdgeGap) return 0
    const style = ownerWindow.getComputedStyle(arrayLast(slides))
    return parseFloat(style.getPropertyValue(`margin-${endEdge}`))
  }

  function getSlideSizesWithGaps(): number[] {
    return slideRects
      .map((rect, index, rects) => {
        const isFirst = !index
        const isLast = arrayIsLastIndex(rects, index)
        if (isFirst) return slideSizes[index] + startGap
        if (isLast) return slideSizes[index] + endGap
        return rects[index + 1][startEdge] - rect[startEdge]
      })
      .map(mathAbs)
  }

  const self: SlideSizesType = {
    slideSizes,
    slideSizesWithGaps,
    startGap,
    endGap
  }
  return self
}
