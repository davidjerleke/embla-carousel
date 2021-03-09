import { Counter } from '../components/counter'
import { Limit } from '../components/limit'

let loopCounter: Counter
let limitCounter: Counter

const limit = Limit({
  min: 0,
  max: 5,
})

beforeEach(() => {
  loopCounter = Counter({ start: 2, limit, loop: true })
  limitCounter = Counter({ start: 2, limit, loop: false })
})

describe('Counter', () => {
  describe('Get & Set', () => {
    test('Gets the value it has been initialized to', () => {
      expect(loopCounter.get()).toBe(2)
      expect(limitCounter.get()).toBe(2)
    })

    test('Sets its value to the given number', () => {
      loopCounter.set(4)
      limitCounter.set(4)
      expect(loopCounter.get()).toBe(4)
      expect(limitCounter.get()).toBe(4)
    })
  })

  describe('Exposes', () => {
    test('Counter MIN ', () => {
      expect(loopCounter.min).toBe(0)
      expect(limitCounter.min).toBe(0)
    })

    test('Counter MAX ', () => {
      expect(loopCounter.max).toBe(5)
      expect(limitCounter.max).toBe(5)
    })
  })

  describe('Clones', () => {
    test('Current counter', () => {
      const loopCounterClone = loopCounter.clone()
      const limitCounterClone = limitCounter.clone()
      expect(loopCounterClone).not.toBe(loopCounter)
      expect(limitCounterClone).not.toBe(limitCounter)
    })

    test('Current counter while preserving its current value', () => {
      const counterClone = loopCounter.clone()
      expect(counterClone.get()).toBe(2)
    })
  })

  describe('Initializes', () => {
    test('Counter value to given number within limit', () => {
      expect(loopCounter.get()).toBe(2)
      expect(limitCounter.get()).toBe(2)
    })

    test('Loop counter value to min if given number is greater than max', () => {
      const loopCounter = Counter({ start: 10, limit, loop: true })
      expect(loopCounter.get()).toBe(0)
    })

    test('Loop counter value to max if given number is less than min', () => {
      const loopCounter = Counter({ start: -10, limit, loop: true })
      expect(loopCounter.get()).toBe(5)
    })

    test('Limit counter value to max if given number is greater than max', () => {
      const limitCounter = Counter({ start: 10, limit, loop: false })
      expect(limitCounter.get()).toBe(5)
    })

    test('Limit Counter value to min if given number is less than min', () => {
      const limitCounter = Counter({ start: -10, limit, loop: false })
      expect(limitCounter.get()).toBe(0)
    })
  })

  describe('Count', () => {
    test('Adds given positive number to value', () => {
      loopCounter.add(2)
      limitCounter.add(2)
      expect(loopCounter.get()).toBe(4)
      expect(limitCounter.get()).toBe(4)
    })

    test('Subtracts given negative number from value', () => {
      loopCounter.add(-2)
      limitCounter.add(-2)
      expect(loopCounter.get()).toBe(0)
      expect(limitCounter.get()).toBe(0)
    })

    test('Loops loop Counter if given positive number + current value is greater than max', () => {
      loopCounter.add(5)
      expect(loopCounter.get()).toBe(1)
    })

    test('Loops loop Counter if given negative number - current value is less than min', () => {
      loopCounter.add(-5)
      expect(loopCounter.get()).toBe(3)
    })

    test('Stops limit Counter at max if given positive number + current value is greater than max', () => {
      limitCounter.add(12)
      expect(limitCounter.get()).toBe(5)
    })

    test('Stops limit Counter at min if given negative number + current value is less than min', () => {
      limitCounter.add(-12)
      expect(limitCounter.get()).toBe(0)
    })
  })
})
