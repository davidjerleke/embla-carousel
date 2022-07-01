import { ScrollLooper } from '../components/ScrollLooper'
import { Vector1D } from '../components/Vector1d'
import { Limit } from '../components/Limit'

const jointSafety = 0.1
const limit = Limit(-100, 100)
const maxLimitWithLoopJoint = limit.max + jointSafety
const minLimitWithLoopJoint = limit.min + jointSafety
const contentSize = limit.length
const location = Vector1D(0)
const vector1InitialValue = 5
const vector2InitialValue = 10
const vectors = [Vector1D(vector1InitialValue), Vector1D(vector2InitialValue)]
const scrollLooper = ScrollLooper(contentSize, limit, location, vectors)

beforeEach(() => {
  vectors[0].set(vector1InitialValue)
  vectors[1].set(vector2InitialValue)
})

describe('ScrollLooper', () => {
  describe('Loops vectors when direction is', () => {
    test('1 and location > limit MAX', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint + 0.01)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vector1InitialValue - contentSize)
      expect(vectors[1].get()).toBe(vector2InitialValue - contentSize)
    })

    test('-1 and location < limit MIN', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint - 0.01)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vector1InitialValue + contentSize)
      expect(vectors[1].get()).toBe(vector2InitialValue + contentSize)
    })
  })

  describe('Does not loop vectors when direction is', () => {
    test('1 and location is within limit MAX', () => {
      const direction = 1
      location.set(maxLimitWithLoopJoint)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vector1InitialValue)
      expect(vectors[1].get()).toBe(vector2InitialValue)
    })

    test('-1 and location is within limit MIN', () => {
      const direction = -1
      location.set(minLimitWithLoopJoint)
      scrollLooper.loop(direction)
      expect(vectors[0].get()).toBe(vector1InitialValue)
      expect(vectors[1].get()).toBe(vector2InitialValue)
    })
  })
})
