import { Limit } from '../components/limit'

let limit: Limit
const limitMin = 0
const limitMax = 100

beforeEach(() => {
  limit = Limit({ min: limitMin, max: limitMax })
})

describe('Limit', () => {
  describe('Expose', () => {
    test('Exposes Limit max ', () => {
      expect(limit.max).toBe(limitMax)
    })
    test('Exposes Limit min ', () => {
      expect(limit.min).toBe(limitMin)
    })
  })

  describe('Loop', () => {
    test('Loops to Limit min when given number is greater than Limit max', () => {
      const number = limit.loop(limitMax + 1)
      expect(number).toBe(limitMin)
    })
    test('Loops to Limit max when given number is less than Limit min', () => {
      const number = limit.loop(limitMin - 1)
      expect(number).toBe(limitMax)
    })
    test('Does not loop when given number is within Limit', () => {
      const number = limit.loop(50)
      expect(number).toBe(50)
    })
  })

  describe('Constrain', () => {
    test('Constrains to Limit max when given number is greater than Limit max', () => {
      const number = limit.constrain(limitMax + 1)
      expect(number).toBe(limitMax)
    })
    test('Constrains to Limit min when given number is less than Limit min', () => {
      const number = limit.constrain(limitMin - 1)
      expect(number).toBe(limitMin)
    })
    test('Does not constrain when given number is within Limit', () => {
      const number = limit.constrain(50)
      expect(number).toBe(50)
    })
  })

  describe('Reached max', () => {
    test('Reached Limit max is true when given number is greater than Limit max', () => {
      const reached = limit.reachedMax(limitMax + 1)
      expect(reached).toBe(true)
    })
    test('Reached Limit max is false when given number is within Limit', () => {
      const reached = limit.reachedMax(50)
      expect(reached).toBe(false)
    })
  })

  describe('Reached min', () => {
    test('Reached Limit min is true when given number is less than Limit min', () => {
      const reached = limit.reachedMin(limitMin - 1)
      expect(reached).toBe(true)
    })
    test('Reached Limit min is false when given number is within Limit', () => {
      const reached = limit.reachedMin(50)
      expect(reached).toBe(false)
    })
  })

  describe('Reached any', () => {
    test('Reached Limit any is true when given number is greater or less than Limit', () => {
      const reachedMax = limit.reachedAny(limitMax + 1)
      expect(reachedMax).toBe(true)
      const reachedMin = limit.reachedAny(limitMin - 1)
      expect(reachedMin).toBe(true)
    })
    test('Reached Limit any is false when given number is within Limit', () => {
      const reachedMax = limit.reachedAny(40)
      expect(reachedMax).toBe(false)
      const reachedMin = limit.reachedAny(20)
      expect(reachedMin).toBe(false)
    })
  })
})
