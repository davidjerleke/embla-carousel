import { Direction } from '../components/direction'
import { Vector1D } from '../components/vector1d'

const positiveDirection = 1
const negativeDirection = -1
const noDirection = 0

describe('Direction', () => {
  describe('Converts a number', () => {
    test('That is positive to 1', () => {
      const initialValue = 10
      const direction = Direction(initialValue).get()
      expect(direction).toBe(positiveDirection)
    })

    test('That is negative to -1', () => {
      const initialValue = -10
      const direction = Direction(initialValue).get()
      expect(direction).toBe(negativeDirection)
    })

    test('That is -0 to 0', () => {
      const initialValue = -0
      const direction = Direction(initialValue).get()
      expect(direction).toBe(noDirection)
    })

    test('That is 0 to 0', () => {
      const initialValue = 0
      const direction = Direction(initialValue).get()
      expect(direction).toBe(noDirection)
    })
  })

  describe('Converts a vector', () => {
    test('That is positive to 1', () => {
      const direction = Direction(0)
      const vector = Vector1D(10)
      direction.set(vector)
      expect(direction.get()).toBe(positiveDirection)
    })

    test('That is negative to -1', () => {
      const direction = Direction(0)
      const vector = Vector1D(-10)
      direction.set(vector)
      expect(direction.get()).toBe(negativeDirection)
    })

    test('That is 0 to 0', () => {
      const direction = Direction(1)
      const vector = Vector1D(0)
      direction.set(vector)
      expect(direction.get()).toBe(positiveDirection)
    })
  })
})
