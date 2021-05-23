import { Limit } from '../../embla-carousel-vanilla/limit'

const minLimit = -100
const maxLimit = 100
const length = Math.abs(minLimit - maxLimit)
const lessThanMin = minLimit - 0.01
const moreThanMax = maxLimit + 0.01
const withinMinAndMax = minLimit + maxLimit
const limit = Limit(minLimit, maxLimit)

describe('Limit', () => {
  describe('Exposes', () => {
    test('Limit MIN', () => {
      expect(limit.min).toBe(minLimit)
    })

    test('Limit MAX', () => {
      expect(limit.max).toBe(maxLimit)
    })

    test('Length', () => {
      expect(limit.length).toBe(length)
    })
  })

  describe('Constrains to limit', () => {
    test('MAX when given number > limit MAX', () => {
      const number = limit.constrain(moreThanMax)
      expect(number).toBe(maxLimit)
    })

    test('MIN when given number < limit MIN', () => {
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

  describe('Removes offset', () => {
    test('When given number > limit MAX', () => {
      const number = limit.removeOffset(moreThanMax)
      expect(number).toBe(moreThanMax - length)
    })

    test('When given number < limit MIN', () => {
      const number = limit.removeOffset(lessThanMin)
      expect(number).toBe(lessThanMin + length)
    })

    test('Until given number is < limit MAX', () => {
      const offsetfactor = 5
      const removeFactor = Math.ceil(offsetfactor / 2)
      const moreThanMaxOffset = moreThanMax * offsetfactor
      const number = limit.removeOffset(moreThanMaxOffset)
      expect(number).toBe(moreThanMaxOffset - length * removeFactor)
    })

    test('Until given number is > limit MIN', () => {
      const offsetfactor = 5
      const removeFactor = Math.ceil(offsetfactor / 2)
      const lessThanMinOffset = lessThanMin * offsetfactor
      const number = limit.removeOffset(lessThanMinOffset)
      expect(number).toBe(lessThanMinOffset + length * removeFactor)
    })
  })

  describe('Does not remove offset', () => {
    test('When given number is within limit', () => {
      const number = limit.removeOffset(withinMinAndMax)
      expect(number).toBe(withinMinAndMax)
    })

    test('When limit MIN equals limit MAX', () => {
      const equalLimit = Limit(maxLimit, maxLimit)
      const number = equalLimit.removeOffset(moreThanMax)
      expect(number).toBe(moreThanMax)
    })
  })

  describe('Reached limit', () => {
    test('MIN is true when given number < limit MAX', () => {
      const reached = limit.reachedMin(lessThanMin)
      expect(reached).toBe(true)
    })

    test('MIN is false when given number is within limit', () => {
      const reached = limit.reachedMin(withinMinAndMax)
      expect(reached).toBe(false)
    })

    test('MAX is true when given number > limit MAX', () => {
      const reached = limit.reachedMax(moreThanMax)
      expect(reached).toBe(true)
    })

    test('MAX is false when given number is within limit', () => {
      const reached = limit.reachedMax(withinMinAndMax)
      expect(reached).toBe(false)
    })

    test('ANY is true when given number > limit MAX or number < limit MIN', () => {
      const reachedMin = limit.reachedAny(lessThanMin)
      const reachedMax = limit.reachedAny(moreThanMax)
      expect(reachedMin).toBe(true)
      expect(reachedMax).toBe(true)
    })

    test('ANY is false when given number is within limit', () => {
      const reachedMin = limit.reachedAny(withinMinAndMax)
      const reachedMax = limit.reachedAny(withinMinAndMax)
      expect(reachedMin).toBe(false)
      expect(reachedMax).toBe(false)
    })
  })
})
