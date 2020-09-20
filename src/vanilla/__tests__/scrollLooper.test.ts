import { PxToPercent } from '../components/pxToPercent'
import { ScrollLooper } from '../components/scrollLooper'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'

let location: Vector1D
let vectors: Vector1D[]
let scrollLooper: ScrollLooper

const viewInPx = 1000
const pxToPercent = PxToPercent(viewInPx)
const loopJoint = pxToPercent.measure(0.1)
const vectorInitialValue1 = 5
const vectorInitialValue2 = 10
const contentSize = 300
const minLimit = -100
const maxLimit = 100
const maxLimitWithLoopJoint = maxLimit + loopJoint
const minLimitWithLoopJoint = minLimit + loopJoint
const limit = Limit({
  min: minLimit,
  max: maxLimit,
})

beforeEach(() => {
  location = Vector1D(0)
  vectors = [Vector1D(vectorInitialValue1), Vector1D(vectorInitialValue2)]
  scrollLooper = ScrollLooper({
    pxToPercent,
    limit,
    location,
    contentSize,
  })
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
