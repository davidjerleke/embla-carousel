import { AlignmentType } from './Alignment'
import { AxisType } from './Axis'
import { SlidesToScrollType } from './SlidesToScroll'
import { arrayLast, mathAbs } from './utils'

export type ScrollSnapType = {
  snaps: number[]
  snapsAligned: number[]
}

export function ScrollSnap(
  axis: AxisType,
  alignment: AlignmentType,
  containerRect: DOMRect,
  slideRects: DOMRect[],
  slidesToScroll: SlidesToScrollType,
): ScrollSnapType {
  const { startEdge, endEdge } = axis
  const { groupSlides } = slidesToScroll
  const snaps = measureUnaligned()
  const snapsAligned = measureAligned()

  function measureSizes(): number[] {
    return groupSlides(slideRects)
      .map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge])
      .map(mathAbs)
  }

  function measureUnaligned(): number[] {
    return slideRects
      .map((rect) => containerRect[startEdge] - rect[startEdge])
      .map((snap) => -mathAbs(snap))
  }

  function measureAligned(): number[] {
    const groupedSnaps = groupSlides(snaps).map((g) => g[0])
    const alignments = measureSizes().map(alignment.measure)
    return groupedSnaps.map((snap, index) => snap + alignments[index])
  }

  const self: ScrollSnapType = {
    snaps,
    snapsAligned,
  }
  return self
}
