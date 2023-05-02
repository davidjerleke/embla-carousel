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
      expect(vector1.value).toBe(initialVectorValue1)
    })

    test('Sets its value to the given number', () => {
      vector1.value = vector2.value
      expect(vector1.value).toBe(initialVectorValue2)
    })
  })

  describe('Operations', () => {
    test('Adds the given number to its value', () => {
      const total = initialVectorValue1 + initialVectorValue2
      vector1.value += vector2.value
      expect(vector1.value).toBe(total)
    })

    test('Subtracts the given number from its value', () => {
      const total = initialVectorValue1 - initialVectorValue2
      vector1.value -= vector2.value
      expect(vector1.value).toBe(total)
    })

    test('Multiplies the given number with its value', () => {
      const factor = 5
      const total = initialVectorValue1 * factor
      vector1.value *= factor
      expect(vector1.value).toBe(total)
    })

    test('Divides its value with the given number', () => {
      const divisor = 5
      const total = initialVectorValue1 / divisor
      vector1.value /= divisor
      expect(vector1.value).toBe(total)
    })
  })
})
