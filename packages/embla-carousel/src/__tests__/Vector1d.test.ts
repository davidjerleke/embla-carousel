import { Vector1D, Vector1DType } from '../components/Vector1d'

let vector1: Vector1DType
let vector2: Vector1DType

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

    test('Sets its value to the given number', () => {
      vector1.set(initialVectorValue2)
      expect(vector1.get()).toBe(initialVectorValue2)
    })

    test('Sets its value to the given vector', () => {
      vector1.set(vector2)
      expect(vector1.get()).toBe(initialVectorValue2)
    })
  })

  describe('Operations', () => {
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
  })
})
