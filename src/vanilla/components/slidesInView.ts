type Params = {
  contentSize: number
  slideSizes: number[]
  viewSize: number
  loop: boolean
  inViewThreshold: number
  snaps: number[]
}

type SlideBound = {
  start: number
  end: number
  index: number
}

export type SlidesInView = {
  check: (location: number) => number[]
  findSlideBounds: (offset: number, threshold?: number) => SlideBound[]
}

export function SlidesInView(params: Params): SlidesInView {
  const { viewSize, contentSize, slideSizes, snaps } = params
  const { inViewThreshold, loop } = params
  const threshold = Math.min(Math.max(inViewThreshold, 0.01), 0.99)
  const offsets = loop ? [0, contentSize, -contentSize] : [0]
  const slideBounds = offsets.reduce((a: SlideBound[], offset) => {
    return a.concat(findSlideBounds(offset, threshold))
  }, [])

  function findSlideBounds(offset: number, threshold?: number): SlideBound[] {
    const thresholds = slideSizes.map(s => s * (threshold || 0))
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

  const self: SlidesInView = {
    check,
    findSlideBounds,
  }
  return self
}
