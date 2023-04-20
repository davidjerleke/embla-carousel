import { ScrollBody } from '../components/ScrollBody'
import { Vector1D } from '../components/Vector1d'

const targetPositive = Vector1D(10)
const targetNegative = Vector1D(-10)
const directionPositive = 1
const directionNegative = -1
const initialLocation = 0
const location = Vector1D(initialLocation)
const scrollBody = ScrollBody(location, 25, 0.68)

beforeEach(() => {
  location.set(initialLocation)
})

describe('ScrollBody', () => {
  describe('Seeks target in a', () => {
    test('Positive direction when target is positive', () => {
      scrollBody.seek(targetPositive)
      expect(location.get()).toBeGreaterThan(initialLocation)
    })

    test('Negative direction when target is negative', () => {
      scrollBody.seek(targetNegative)
      expect(location.get()).toBeLessThan(initialLocation)
    })
  })

  describe('Instantly goes to', () => {
    test('Positive target when duration is 0', () => {
      scrollBody.useDuration(0)
      scrollBody.seek(targetPositive)
      expect(location.get()).toBe(targetPositive.get())
    })

    test('Negative target when duration is 0', () => {
      scrollBody.useDuration(0)
      scrollBody.seek(targetNegative)
      expect(location.get()).toBe(targetNegative.get())
    })
  })

  describe('Direction is', () => {
    test('1 when it seeks a positive target', () => {
      scrollBody.seek(targetPositive)
      expect(scrollBody.direction()).toBe(directionPositive)
    })

    test('1 when it instantly goes to a positive target', () => {
      scrollBody.useDuration(0)
      scrollBody.seek(targetPositive)
      expect(scrollBody.direction()).toBe(directionPositive)
    })

    test('-1 when it seeks a negative target', () => {
      scrollBody.seek(targetNegative)
      expect(scrollBody.direction()).toBe(directionNegative)
    })

    test('-1 when it instantly goes to a negative target', () => {
      scrollBody.useDuration(0)
      scrollBody.seek(targetNegative)
      expect(scrollBody.direction()).toBe(directionNegative)
    })
  })

  describe('Settle is', () => {
    test('True when diff to given target is <= 0.001', () => {
      location.set(9.999)
      expect(scrollBody.settle(targetPositive)).toBe(true)
    })

    test('False when diff to given target is > 0.001', () => {
      location.set(9.99)
      expect(scrollBody.settle(targetPositive)).toBe(false)
    })
  })
})
