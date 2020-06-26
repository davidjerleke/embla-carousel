import { Direction } from '../components/direction'
import { Vector1D } from '../components/vector1d'

const positiveDirection = 1
const negativeDirection = -1
const noDirection = 0

describe('Direction', () => {
  describe('Sets its given initial value that is', () => {
    test('Positive to 1', () => {
      const initialValue = 10
      const direction = Direction(initialValue).get()
      expect(direction).toBe(positiveDirection)
    })

    test('Negative to -1', () => {
      const initialValue = -10
      const direction = Direction(initialValue).get()
      expect(direction).toBe(negativeDirection)
    })

    test('0 to 0', () => {
      const direction = Direction(noDirection).get()
      expect(direction).toBe(noDirection)
    })

    test('-0 to 0', () => {
      const direction = Direction(-noDirection).get()
      expect(direction).toBe(noDirection)
    })
  })

  describe('Sets direction to', () => {
    test('1 when given vector is positive', () => {
      const direction = Direction(noDirection)
      const vector = Vector1D(10)
      direction.set(vector)
      expect(direction.get()).toBe(positiveDirection)
    })

    test('-1 when given vector is negative', () => {
      const direction = Direction(noDirection)
      const vector = Vector1D(-10)
      direction.set(vector)
      expect(direction.get()).toBe(negativeDirection)
    })

    test('Nothing new when given vector is 0', () => {
      const direction = Direction(positiveDirection)
      const vector = Vector1D(noDirection)
      direction.set(vector)
      expect(direction.get()).toBe(positiveDirection)
    })

    test('Nothing new when given vector is -0', () => {
      const direction = Direction(positiveDirection)
      const vector = Vector1D(-noDirection)
      direction.set(vector)
      expect(direction.get()).toBe(positiveDirection)
    })
  })
})
