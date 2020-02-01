import { Limit } from '../components/limit'
import { ScrollBy } from '../components/scrollBy'
import { ScrollLimit } from '../components/scrollLimit'
import { Vector1D } from '../components/vector1d'

const snapSizes = [80, 40, 30, 40, 60]
const scrollSnaps = [10, -50, -85, -120, -170]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)
const progressBelowScrollLength = 0.25
const progressAboveScrollLength = 2

const getScrollLimit = (loop: boolean): Limit => {
  const scrollLimit = ScrollLimit({ contentSize, loop })
  return scrollLimit.measure(scrollSnaps)
}

const getScrollBy = (loop: boolean, target: Vector1D): ScrollBy => {
  const limit = getScrollLimit(loop)
  return ScrollBy({ target, limit, loop })
}

describe('ScrollBy', () => {
  describe('Loop False', () => {
    const loop = false
    const scrollLimit = getScrollLimit(loop)
    const scrollLength = scrollLimit.min - scrollLimit.max

    test('Distance adds to current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressBelowScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })
    test('Distance subtracts from current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressBelowScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })

    test('Distance does not exceed the Limit min bound', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = progressAboveScrollLength
      expect(scrollBy.distance(progress)).toBe(0)
    })
    test('Distance does not exceed the Limit max bound', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = -progressAboveScrollLength
      expect(scrollBy.distance(progress)).toBe(0)
    })
  })

  describe('Loop True', () => {
    const loop = true
    const scrollLimit = getScrollLimit(loop)
    const scrollLength = scrollLimit.min - scrollLimit.max

    test('Distance adds to current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressBelowScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })
    test('Distance subtracts from current scroll location', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressBelowScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })

    test('Distance is allowed to exceed the Limit min bound', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.max))
      const progress = progressAboveScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })
    test('Distance is allowed to exceed the Limit max bound', () => {
      const scrollBy = getScrollBy(loop, Vector1D(scrollLimit.min))
      const progress = -progressAboveScrollLength
      const distance = scrollLength * progress
      expect(scrollBy.distance(progress)).toBe(distance)
    })
  })
})
