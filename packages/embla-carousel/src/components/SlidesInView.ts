type SlideBoundType = {
  start: number
  end: number
  index: number
}

export type SlidesInViewType = {
  check: (location: number) => number[]
  findSlideBounds: (offset: number, threshold?: number) => SlideBoundType[]
}

export function SlidesInView(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  snaps: number[],
  loop: boolean,
  inViewThreshold: number,
): SlidesInViewType {
  const threshold = Math.min(Math.max(inViewThreshold, 0.01), 0.99)
  const offsets = loop ? [0, contentSize, -contentSize] : [0]
  const slideBounds = offsets.reduce((a: SlideBoundType[], offset) => {
    return a.concat(findSlideBounds(offset, threshold))
  }, [])

  function findSlideBounds(
    offset: number,
    threshold?: number,
  ): SlideBoundType[] {
    const thresholds = slideSizes.map((s) => s * (threshold || 0))
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + thresholds[index] + offset,
      end: snap + viewSize - thresholds[index] + offset,
      index,
    }))
  }

  function check(location: number): number[] {
    return slideBounds.reduce((list: number[], slideBound) => {
      const { index, start, end } = slideBound
      const inList = list.indexOf(index) !== -1
      const inView = start < location && end > location
      return !inList && inView ? list.concat([index]) : list
    }, [])
  }

  const self: SlidesInViewType = {
    check,
    findSlideBounds,
  }
  return self
}
