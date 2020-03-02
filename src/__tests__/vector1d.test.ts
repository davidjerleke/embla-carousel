import { Vector1D } from '../components/vector1d'

let vector1: Vector1D
let vector2: Vector1D

beforeEach(() => {
  vector1 = Vector1D(10)
  vector2 = Vector1D(5)
})

describe('Vector1D', () => {
  describe('Get & Set', () => {
    test('Gets Vector value', () => {
      expect(vector1.get()).toBe(10)
    })
    test('Sets Vector value to given Vector', () => {
      vector1.set(vector2)
      expect(vector1.get()).toBe(5)
    })
    test('Sets Vector value to given number', () => {
      vector1.set(5)
      expect(vector1.get()).toBe(5)
    })
  })

  describe('Operations', () => {
    test('Adds given Vector to Vector value', () => {
      vector1.add(vector2)
      expect(vector1.get()).toBe(15)
    })
    test('Subtracts given Vector from Vector value', () => {
      vector1.subtract(vector2)
      expect(vector1.get()).toBe(5)
    })
    test('Multiplies Vector value with given number', () => {
      vector1.multiply(5)
      expect(vector1.get()).toBe(50)
    })
    test('Divides Vector value with given number', () => {
      vector1.divide(5)
      expect(vector1.get()).toBe(2)
    })
    test('Adds given number to Vector value', () => {
      vector1.add(5)
      expect(vector1.get()).toBe(15)
    })
    test('Subtracts given number from Vector value', () => {
      vector1.subtract(5)
      expect(vector1.get()).toBe(5)
    })
    test('Normalizes Vector value to 1', () => {
      vector1.normalize()
      expect(vector1.get()).toBe(1)
    })
  })
})
