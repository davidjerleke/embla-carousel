import { Limit } from '../components/limit'

const minLimit = -100
const maxLimit = 100
const lessThanMin = minLimit - 1
const moreThanMax = maxLimit + 1
const withinMinAndMax = minLimit + maxLimit
const limit = Limit({
  min: minLimit,
  max: maxLimit,
})

describe('Limit', () => {
  describe('Exposes limit', () => {
    test('Min', () => {
      expect(limit.min).toBe(minLimit)
    })

    test('Max', () => {
      expect(limit.max).toBe(maxLimit)
    })
  })

  describe('Loops to limit', () => {
    test('Max when given number < limit min', () => {
      const number = limit.loop(lessThanMin)
      expect(number).toBe(maxLimit)
    })

    test('Min when given number > limit max', () => {
      const number = limit.loop(moreThanMax)
      expect(number).toBe(minLimit)
    })
  })

  describe('Does not loop', () => {
    test('When given number is within limit', () => {
      const number = limit.loop(withinMinAndMax)
      expect(number).toBe(withinMinAndMax)
    })
  })

  describe('Constrains to limit ', () => {
    test('Max when given number > limit max', () => {
      const number = limit.constrain(moreThanMax)
      expect(number).toBe(maxLimit)
    })
    test('Min when given number < limit min', () => {
      const number = limit.constrain(lessThanMin)
      expect(number).toBe(minLimit)
    })
  })

  describe('Does not constrain', () => {
    test('When given number is within limit', () => {
      const number = limit.constrain(withinMinAndMax)
      expect(number).toBe(withinMinAndMax)
    })
  })

  describe('Reached limit', () => {
    test('Min is true when given number < limit min', () => {
      const reached = limit.reachedMin(lessThanMin)
      expect(reached).toBe(true)
    })

    test('Min is false when given number is within limit', () => {
      const reached = limit.reachedMin(withinMinAndMax)
      expect(reached).toBe(false)
    })

    test('Max is true when given number > limit max', () => {
      const reached = limit.reachedMax(moreThanMax)
      expect(reached).toBe(true)
    })

    test('Max is false when given number is within limit', () => {
      const reached = limit.reachedMax(withinMinAndMax)
      expect(reached).toBe(false)
    })

    test('Any is true when given number > limit max or number < limit min', () => {
      const reachedMin = limit.reachedAny(lessThanMin)
      const reachedMax = limit.reachedAny(moreThanMax)
      expect(reachedMin).toBe(true)
      expect(reachedMax).toBe(true)
    })

    test('Any is false when given number is within limit', () => {
      const reachedMin = limit.reachedAny(withinMinAndMax)
      const reachedMax = limit.reachedAny(withinMinAndMax)
      expect(reachedMin).toBe(false)
      expect(reachedMax).toBe(false)
    })
  })
})
