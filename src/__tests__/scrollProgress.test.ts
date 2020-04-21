import { ScrollLimit } from '../components/scrollLimit'
import { ScrollProgress } from '../components/scrollProgress'
import { Vector1D } from '../components/vector1d'

const snapSizes = [80, 80, 80, 80, 80]
const scrollSnaps = [0, -80, -160, -240, -320]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)
const loop = false
const progressMin = 0
const progressMax = 1
const progressHalf = 0.5
const target = Vector1D(0)
const scrollLimit = ScrollLimit({ contentSize, loop })
const limit = scrollLimit.measure(scrollSnaps)
const scrollProgress = ScrollProgress({ target, limit, loop })
const scrollEnd = limit.min
const scrollStart = limit.max
const scrollHalf = scrollEnd * progressHalf
const scrollLength = Math.abs(scrollEnd)

describe('ScrollProgress', () => {
  describe('Get calculates correct progress when given location is', () => {
    test('Max', () => {
      const progress = scrollProgress.get(scrollStart)
      expect(progress).toEqual(-progressMin)
    })

    test('Min', () => {
      const progress = scrollProgress.get(scrollEnd)
      expect(progress).toBe(progressMax)
    })
  })

  describe('Set calculates correct distance to target when given progress is', () => {
    test('Max', () => {
      target.set(scrollStart)
      const distance = scrollProgress.set(progressMax)
      expect(distance).toBe(-scrollLength)
    })

    test('Min', () => {
      target.set(scrollEnd)
      const distance = scrollProgress.set(progressMin)
      expect(distance).toBe(scrollLength)
    })
  })

  describe('Add calculates correct distance to target when given progress is', () => {
    test('Positive', () => {
      target.set(scrollStart)
      const distance = scrollProgress.add(progressHalf)
      expect(distance).toBe(scrollHalf)
    })

    test('Negative', () => {
      target.set(scrollEnd)
      const distance = scrollProgress.add(-progressHalf)
      expect(distance).toBe(-scrollHalf)
    })
  })

  describe('Add constrains exceeding distances to scroll limit', () => {
    test('Max', () => {
      target.set(scrollStart)
      const distance = scrollProgress.add(progressMin - 0.01)
      expect(distance).toBe(0)
    })

    test('Min', () => {
      target.set(scrollEnd)
      const distance = scrollProgress.add(progressMax + 0.01)
      expect(distance).toBe(0)
    })
  })
})
