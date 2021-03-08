import { Alignment } from './alignment'
import { Axis } from './axis'
import { PxToPercent } from './pxToPercent'
import { arrayLast, groupArray } from './utils'

type Params = {
  alignment: Alignment
  axis: Axis
  pxToPercent: PxToPercent
  containerRect: DOMRect
  slideRects: DOMRect[]
  slidesToScroll: number
}

export type ScrollSnap = {
  snaps: number[]
  snapsAligned: number[]
}

export function ScrollSnap(params: Params): ScrollSnap {
  const { containerRect, slideRects, slidesToScroll } = params
  const { alignment, axis, pxToPercent } = params
  const { startEdge, endEdge } = axis
  const snaps = measureUnaligned()
  const snapsAligned = measureAligned()

  function measureSizes(): number[] {
    return groupArray(slideRects, slidesToScroll)
      .map(rects => arrayLast(rects)[endEdge] - rects[0][startEdge])
      .map(pxToPercent.measure)
      .map(Math.abs)
  }

  function measureUnaligned(): number[] {
    return slideRects
      .map(rect => containerRect[startEdge] - rect[startEdge])
      .map(pxToPercent.measure)
      .map(snap => -Math.abs(snap))
  }

  function measureAligned(): number[] {
    const groupedSnaps = groupArray(snaps, slidesToScroll).map(g => g[0])
    const alignments = measureSizes().map(alignment.measure)
    return groupedSnaps.map((snap, index) => snap + alignments[index])
  }

  const self: ScrollSnap = {
    snaps,
    snapsAligned,
  }
  return self
}
