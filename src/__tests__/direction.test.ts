import { Direction } from '../components/direction'
import { Vector1D } from '../components/vector1d'

let direction: Direction
let vector: Vector1D

beforeEach(() => {
  direction = Direction(0)
  vector = Vector1D(0)
})

describe('Direction', () => {
  describe('Initialize', () => {
    test('Initializes Direction value with given positive number normalized to 1', () => {
      const direction = Direction(10)
      expect(direction.get()).toBe(1)
    })
    test('Initializes Direction value with given negative number normalized to -1', () => {
      const direction = Direction(-10)
      expect(direction.get()).toBe(-1)
    })
  })

  describe('Set', () => {
    test('Sets Direction value to given positive Vector normalized to 1', () => {
      vector.setNumber(10)
      direction.set(vector)
      expect(direction.get()).toBe(1)
    })
    test('Sets Direction value to given negative Vector normalized to -1', () => {
      vector.setNumber(-10)
      direction.set(vector)
      expect(direction.get()).toBe(-1)
    })
    test('Does not set Direction value if given Vector has value of 0', () => {
      const direction = Direction(1)
      direction.set(vector)
      expect(direction.get()).toBe(1)
    })
  })
})
