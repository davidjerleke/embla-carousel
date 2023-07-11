import { ScrollBody } from '../components/ScrollBody'
import { Vector1D } from '../components/Vector1d'

const targetPositive = 10
const targetNegative = -10
const directionPositive = 1
const directionNegative = -1
const initialLocation = 0
const target = Vector1D(initialLocation)
const location = Vector1D(initialLocation)
const scrollBody = ScrollBody(location, target, 25, 0.68)

beforeEach(() => {
  target.set(initialLocation)
  location.set(initialLocation)
})

describe('ScrollBody', () => {
  describe('Seeks target in a', () => {
    test('Positive direction when target is positive', () => {
      target.set(targetPositive)
      scrollBody.seek()
      expect(location.get()).toBeGreaterThan(initialLocation)
    })

    test('Negative direction when target is negative', () => {
      target.set(targetNegative)
      scrollBody.seek()
      expect(location.get()).toBeLessThan(initialLocation)
    })
  })

  describe('Instantly goes to', () => {
    test('Positive target when duration is 0', () => {
      target.set(targetPositive)
      scrollBody.useDuration(0)
      scrollBody.seek()
      expect(location.get()).toBe(targetPositive)
    })

    test('Negative target when duration is 0', () => {
      target.set(targetNegative)
      scrollBody.useDuration(0)
      scrollBody.seek()
      expect(location.get()).toBe(targetNegative)
    })
  })

  describe('Direction is', () => {
    test('1 when it seeks a positive target', () => {
      target.set(targetPositive)
      scrollBody.seek()
      expect(scrollBody.direction()).toBe(directionPositive)
    })

    test('1 when it instantly goes to a positive target', () => {
      target.set(targetPositive)
      scrollBody.useDuration(0)
      scrollBody.seek()
      expect(scrollBody.direction()).toBe(directionPositive)
    })

    test('-1 when it seeks a negative target', () => {
      target.set(targetNegative)
      scrollBody.seek()
      expect(scrollBody.direction()).toBe(directionNegative)
    })

    test('-1 when it instantly goes to a negative target', () => {
      target.set(targetNegative)
      scrollBody.useDuration(0)
      scrollBody.seek()
      expect(scrollBody.direction()).toBe(directionNegative)
    })
  })

  describe('Settle is', () => {
    test('True when diff to given target is <= 0.001', () => {
      target.set(targetPositive)
      location.set(9.999)
      scrollBody.seek()
      expect(scrollBody.settled()).toBe(true)
    })

    test('False when diff to given target is > 0.001', () => {
      target.set(targetPositive)
      location.set(9.99)
      scrollBody.seek()
      expect(scrollBody.settled()).toBe(false)
    })
  })
})
