import { Vector1D } from '../components/vector1d'

let vector1: Vector1D
let vector2: Vector1D

const initialVectorValue1 = 10
const initialVectorValue2 = 5

beforeEach(() => {
  vector1 = Vector1D(initialVectorValue1)
  vector2 = Vector1D(initialVectorValue2)
})

describe('Vector1D', () => {
  describe('Get & Set', () => {
    test('Gets the value it has been initialized to', () => {
      expect(vector1.get()).toBe(initialVectorValue1)
    })

    test('Sets its value to the given vector', () => {
      vector1.set(vector2)
      expect(vector1.get()).toBe(initialVectorValue2)
    })

    test('Sets its value to the given number', () => {
      vector1.set(initialVectorValue2)
      expect(vector1.get()).toBe(initialVectorValue2)
    })
  })

  describe('Operations', () => {
    test('Adds the given vector to its value', () => {
      const total = initialVectorValue1 + initialVectorValue2
      vector1.add(vector2)
      expect(vector1.get()).toBe(total)
    })

    test('Subtracts the given vector from its value', () => {
      const total = initialVectorValue1 - initialVectorValue2
      vector1.subtract(vector2)
      expect(vector1.get()).toBe(total)
    })

    test('Multiplies the given number with its value', () => {
      const factor = 5
      const total = initialVectorValue1 * factor
      vector1.multiply(factor)
      expect(vector1.get()).toBe(total)
    })

    test('Divides its value with the given number', () => {
      const divisor = 5
      const total = initialVectorValue1 / divisor
      vector1.divide(divisor)
      expect(vector1.get()).toBe(total)
    })

    test('Adds the given number to its value', () => {
      const total = initialVectorValue1 + initialVectorValue2
      vector1.add(initialVectorValue2)
      expect(vector1.get()).toBe(total)
    })

    test('Subtracts the given number from its value', () => {
      const total = initialVectorValue1 - initialVectorValue2
      vector1.subtract(initialVectorValue2)
      expect(vector1.get()).toBe(total)
    })

    test('Normalizes a positive vector to 1', () => {
      vector1.normalize()
      expect(vector1.get()).toBe(1)
    })

    test('Normalizes a negative vector to 1', () => {
      vector1.multiply(-1).normalize()
      expect(vector1.get()).toBe(1)
    })
  })
})
