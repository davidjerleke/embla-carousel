import { AlignmentType } from './Alignment'
import { AxisType } from './Axis'
import { PxToPercentType } from './PxToPercent'
import { arrayLast, arrayGroup, mathAbs } from './utils'

export type ScrollSnapType = {
  snaps: number[]
  snapsAligned: number[]
}

export function ScrollSnap(
  axis: AxisType,
  alignment: AlignmentType,
  pxToPercent: PxToPercentType,
  containerRect: DOMRect,
  slideRects: DOMRect[],
  slidesToScroll: number,
): ScrollSnapType {
  const { startEdge, endEdge } = axis
  const snaps = measureUnaligned()
  const snapsAligned = measureAligned()

  function measureSizes(): number[] {
    return arrayGroup(slideRects, slidesToScroll)
      .map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge])
      .map(pxToPercent.measure)
      .map(mathAbs)
  }

  function measureUnaligned(): number[] {
    return slideRects
      .map((rect) => containerRect[startEdge] - rect[startEdge])
      .map(pxToPercent.measure)
      .map((snap) => -mathAbs(snap))
  }

  function measureAligned(): number[] {
    const groupedSnaps = arrayGroup(snaps, slidesToScroll).map((g) => g[0])
    const alignments = measureSizes().map(alignment.measure)
    return groupedSnaps.map((snap, index) => snap + alignments[index])
  }

  const self: ScrollSnapType = {
    snaps,
    snapsAligned,
  }
  return self
}
