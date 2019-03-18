import { Limit } from '../components/limit'

let limit: Limit
const limitLow = 0
const limitHigh = 100

beforeEach(() => {
  limit = Limit({ low: limitLow, high: limitHigh })
})

describe('Limit', () => {
  describe('Expose', () => {
    test('Exposes Limit high ', () => {
      expect(limit.high).toBe(limitHigh)
    })
    test('Exposes Limit low ', () => {
      expect(limit.low).toBe(limitLow)
    })
  })

  describe('Loop', () => {
    test('Loops to Limit low when given number is greater than Limit high', () => {
      const number = limit.loop(limitHigh + 1)
      expect(number).toBe(limitLow)
    })
    test('Loops to Limit high when given number is less than Limit low', () => {
      const number = limit.loop(limitLow - 1)
      expect(number).toBe(limitHigh)
    })
    test('Does not loop when given number is within Limit', () => {
      const number = limit.loop(50)
      expect(number).toBe(50)
    })
  })

  describe('Constrain', () => {
    test('Constrains to Limit high when given number is greater than Limit high', () => {
      const number = limit.constrain(limitHigh + 1)
      expect(number).toBe(limitHigh)
    })
    test('Constrains to Limit low when given number is less than Limit low', () => {
      const number = limit.constrain(limitLow - 1)
      expect(number).toBe(limitLow)
    })
    test('Does not constrain when given number is within Limit', () => {
      const number = limit.constrain(50)
      expect(number).toBe(50)
    })
  })

  describe('Reached high', () => {
    test('Reached Limit high is true when given number is greater than Limit high', () => {
      const reached = limit.reached.high(limitHigh + 1)
      expect(reached).toBe(true)
    })
    test('Reached Limit high is false when given number is within Limit', () => {
      const reached = limit.reached.high(50)
      expect(reached).toBe(false)
    })
  })

  describe('Reached low', () => {
    test('Reached Limit low is true when given number is less than Limit low', () => {
      const reached = limit.reached.low(limitLow - 1)
      expect(reached).toBe(true)
    })
    test('Reached Limit low is false when given number is within Limit', () => {
      const reached = limit.reached.low(50)
      expect(reached).toBe(false)
    })
  })

  describe('Reached any', () => {
    test('Reached Limit any is true when given number is greater or less than Limit', () => {
      const reachedHigh = limit.reached.any(limitHigh + 1)
      expect(reachedHigh).toBe(true)
      const reachedLow = limit.reached.any(limitLow - 1)
      expect(reachedLow).toBe(true)
    })
    test('Reached Limit any is false when given number is within Limit', () => {
      const reachedHigh = limit.reached.any(40)
      expect(reachedHigh).toBe(false)
      const reachedLow = limit.reached.any(20)
      expect(reachedLow).toBe(false)
    })
  })
})
