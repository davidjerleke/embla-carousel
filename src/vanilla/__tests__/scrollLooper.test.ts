import { PxToPercent } from '../components/pxToPercent'
import { ScrollLooper } from '../components/scrollLooper'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'

const pxToPercent = PxToPercent(1000)
const loopJoint = pxToPercent.measure(0.1)
const limit = Limit({ min: -100, max: 100 })
const maxLimitWithLoopJoint = limit.max + loopJoint
const minLimitWithLoopJoint = limit.min + loopJoint
const contentSize = limit.length
const location = Vector1D(0)
const vectorInitialValue1 = 5
const vectorInitialValue2 = 10
const vectors = [Vector1D(vectorInitialValue1), Vector1D(vectorInitialValue2)]
const scrollLooper = ScrollLooper({
  contentSize,
  limit,
  location,
  pxToPercent,
})

beforeEach(() => {
  vectors[0].set(vectorInitialValue1)
  vectors[1].set(vectorInitialValue2)
})

describe('ScrollLooper', () => {
  describe('Loops vectors when direction is', () => {
    test('1 and location > limit max', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint + 0.01)
      scrollLooper.loop(vectors, direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1 - contentSize)
      expect(vectors[1].get()).toBe(vectorInitialValue2 - contentSize)
    })

    test('-1 and location < limit min', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint - 0.01)
      scrollLooper.loop(vectors, direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1 + contentSize)
      expect(vectors[1].get()).toBe(vectorInitialValue2 + contentSize)
    })
  })

  describe('Does not loop vectors when direction is', () => {
    test('1 and location is within limit max', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint)
      scrollLooper.loop(vectors, direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1)
      expect(vectors[1].get()).toBe(vectorInitialValue2)
    })

    test('-1 and location is within limit min', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint)
      scrollLooper.loop(vectors, direction)
      expect(vectors[0].get()).toBe(vectorInitialValue1)
      expect(vectors[1].get()).toBe(vectorInitialValue2)
    })
  })
})
