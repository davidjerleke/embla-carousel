import { AlignmentType } from './Alignment'
import { AxisType } from './Axis'
import { SlidesToScrollType } from './SlidesToScroll'
import { arrayLast, arrayLastIndex, mathAbs } from './utils'

export type ScrollSnapsType = {
  snaps: number[]
  snapsAligned: number[]
}

export function ScrollSnaps(
  axis: AxisType,
  alignment: AlignmentType,
  containerRect: DOMRect,
  slideRects: DOMRect[],
  slideSizesWithGaps: number[],
  slidesToScroll: SlidesToScrollType,
  containScroll: boolean,
): ScrollSnapsType {
  const { startEdge, endEdge } = axis
  const { groupSlides } = slidesToScroll
  const alignments = measureSizes().map(alignment.measure)
  const snaps = measureUnaligned()
  const snapsAligned = measureAligned()

  function measureStart(): number {
    return 0
  }

  function measureEnd(): number {
    return arrayLast(snaps) - arrayLast(slideSizesWithGaps)
  }

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
    return groupSlides(snaps)
      .map((g) => g[0])
      .map((snap, index, groupedSnaps) => {
        const isFirst = !index
        const isLast = index === arrayLastIndex(groupedSnaps)
        if (containScroll && isFirst) return measureStart()
        if (containScroll && isLast) return measureEnd()
        return snap + alignments[index]
      })
  }

  const self: ScrollSnapsType = {
    snaps,
    snapsAligned,
  }
  return self
}
