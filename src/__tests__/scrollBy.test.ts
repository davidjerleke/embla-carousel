import { Limit } from '../components/limit'
import { ScrollBy } from '../components/scrollBy'
import { ScrollLimit } from '../components/scrollLimit'
import { Vector1D } from '../components/vector1d'

const snapSizes = [80, 40, 30, 40, 60]
const scrollSnaps = [10, -50, -85, -120, -170]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)
const progressLessThanScrollLength = 0.25
const progressMoreThanScrollLength = 2

const getScrollLimit = (loop: boolean): Limit => {
  const scrollLimit = ScrollLimit({ contentSize, loop })
  return scrollLimit.measure(scrollSnaps)
}

const getScrollBy = (loop: boolean, target: Vector1D): ScrollBy => {
  const limit = getScrollLimit(loop)
  return ScrollBy({ target, limit, loop })
}

describe('ScrollBy', () => {
  describe('When loop is false, distance is', () => {
    const loop = false
    const scrollLimit = getScrollLimit(loop)
    const scrollLength = scrollLimit.min - scrollLimit.max

    test('Added to current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressLessThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })

    test('Subtracted from current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressLessThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })

    test('Limited to limit min', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = progressMoreThanScrollLength
      expect(scrollBy.progress(progress)).toBe(0)
    })

    test('Limited to limit max', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = -progressMoreThanScrollLength
      expect(scrollBy.progress(progress)).toBe(0)
    })
  })

  describe('When loop is true, distance is', () => {
    const loop = true
    const scrollLimit = getScrollLimit(loop)
    const scrollLength = scrollLimit.min - scrollLimit.max

    test('Added to current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressLessThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })

    test('Subtracted from current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressLessThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })

    test('Allowed to exceed limit min', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressMoreThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })

    test('Allowed to exceed limit max', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressMoreThanScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.progress(progress)).toBe(distance)
    })
  })
})
