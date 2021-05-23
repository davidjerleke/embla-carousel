import { PxToPercent } from '../../embla-carousel-vanilla/pxToPercent'
import { ScrollLooper } from '../../embla-carousel-vanilla/scrollLooper'
import { Vector1D } from '../../embla-carousel-vanilla/vector1d'
import { Limit } from '../../embla-carousel-vanilla/limit'

const pxToPercent = PxToPercent(1000)
const loopJoint = pxToPercent.measure(0.1)
const limit = Limit(-100, 100)
const maxLimitWithLoopJoint = limit.max + loopJoint
const minLimitWithLoopJoint = limit.min + loopJoint
const contentSize = limit.length
const location = Vector1D(0)
const vectorInitialValue1 = 5
const vectorInitialValue2 = 10
const vectors = [Vector1D(vectorInitialValue1), Vector1D(vectorInitialValue2)]
const scrollLooper = ScrollLooper(
  contentSize,
  pxToPercent,
  limit,
  location,
  vectors,
)

beforeEach(() => {
  vectors[0].set(vectorInitialValue1)
  vectors[1].set(vectorInitialValue2)
})

describe('ScrollLooper', () => {
  describe('Loops vectors when direction is', () => {
    test('1 and location > limit MAX', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint + 0.01)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1 - contentSize)
      expect(vectors[1].get()).toBe(vectorInitialValue2 - contentSize)
    })

    test('-1 and location < limit MIN', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint - 0.01)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1 + contentSize)
      expect(vectors[1].get()).toBe(vectorInitialValue2 + contentSize)
    })
  })

  describe('Does not loop vectors when direction is', () => {
    test('1 and location is within limit MAX', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1)
      expect(vectors[1].get()).toBe(vectorInitialValue2)
    })

    test('-1 and location is within limit MIN', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1)
      expect(vectors[1].get()).toBe(vectorInitialValue2)
    })
  })
})
