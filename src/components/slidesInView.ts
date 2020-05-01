import { Limit } from './limit'
import { arrayKeys } from './utils'

type Params = {
  contentSize: number
  slideSizes: number[]
  viewSize: number
  loop: boolean
  inViewThreshold: number
}

type SlidePoint = {
  start: number
  end: number
  index: number
}

export type SlidesInView = {
  check: (location: number) => number[]
}

export function SlidesInView(params: Params): SlidesInView {
  const { contentSize, slideSizes, viewSize } = params
  const { inViewThreshold, loop } = params
  const thresholds = slideSizes.map(s => s * inViewThreshold)
  const scrollSnaps = arrayKeys(slideSizes).map(scrollSnap)
  const pointsToCheck = concatSlidePoints()

  function scrollSnap(index: number): number {
    const span = slideSizes.slice(0, index)
    return span.reduce((a, s) => a - s, 0)
  }

  function concatSlidePoints(): SlidePoint[] {
    const offsets = loop ? [0, contentSize, -contentSize] : [0]
    return offsets.map(slidePoints).reduce((a, b) => a.concat(b), [])
  }

  function slidePoints(offset: number): SlidePoint[] {
    return scrollSnaps.map((snap, index) => ({
      start: snap - slideSizes[index] + thresholds[index] + offset,
      end: snap + viewSize - thresholds[index] + offset,
      index,
    }))
  }

  function check(location: number): number[] {
    return pointsToCheck.reduce((list: number[], point) => {
      const { index, start, end } = point
      const inList = list.indexOf(index) !== -1
      const inView = start < location && end > location
      return !inList && inView ? list.concat([index]) : list
    }, [])
  }

  const self: SlidesInView = {
    check,
  }
  return Object.freeze(self)
}
