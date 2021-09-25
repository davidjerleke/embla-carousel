import { Counter, CounterType } from '../components/Counter'

let loopCounter: CounterType
let limitCounter: CounterType
const min = 0
const max = 5
const start = 2

describe('Counter', () => {
  describe('Limit counter', () => {
    beforeEach(() => {
      limitCounter = Counter(max, start, false)
    })

    describe('Initializes the counter value to', () => {
      test('The given number when it is within limit', () => {
        expect(limitCounter.get()).toBe(start)
      })

      test('MAX if given number is greater than MAX', () => {
        const limitCounter = Counter(max, max + 1, false)
        expect(limitCounter.get()).toBe(max)
      })

      test('MIN if given number is less than MIN', () => {
        const limitCounter = Counter(max, min - 1, false)
        expect(limitCounter.get()).toBe(min)
      })
    })

    describe('Sets the counter value to', () => {
      test('The given number when it is within limit', () => {
        expect(limitCounter.set(4).get()).toBe(4)
      })

      test('MAX if given number is greater than MAX', () => {
        expect(limitCounter.set(10).get()).toBe(max)
      })

      test('MIN if given number is less than MIN', () => {
        expect(limitCounter.set(-10).get()).toBe(min)
      })
    })

    describe('Given number is', () => {
      test('Added if it is positive', () => {
        expect(limitCounter.add(3).get()).toBe(max)
      })

      test('Subtracted if it is negative', () => {
        expect(limitCounter.add(-2).get()).toBe(min)
      })
    })

    describe('Counter constrains its value to', () => {
      test('MAX if given number + current value is greater than MAX', () => {
        expect(limitCounter.add(12).get()).toBe(max)
      })

      test('MIN if given number + current value is less than MIN', () => {
        expect(limitCounter.add(-12).get()).toBe(min)
      })
    })

    describe('Clones the current counter', () => {
      test('Into a new instance', () => {
        expect(limitCounter.clone()).not.toBe(limitCounter)
      })

      test('And preserves its current value', () => {
        expect(limitCounter.clone().get()).toBe(start)
      })
    })
  })

  describe('Loop counter', () => {
    beforeEach(() => {
      loopCounter = Counter(max, start, true)
    })

    describe('Initializes the counter value to', () => {
      test('The given number when it is within limit', () => {
        expect(loopCounter.get()).toBe(start)
      })

      test('The corresponding number without the positive offset', () => {
        const loopCounter = Counter(max, max + 1, true)
        expect(loopCounter.get()).toBe(min)
      })

      test('The corresponding number without the negative offset', () => {
        const loopCounter = Counter(max, min - 1, true)
        expect(loopCounter.get()).toBe(max)
      })
    })

    describe('Sets the counter value to', () => {
      test('The given number when it is within limit', () => {
        expect(loopCounter.set(4).get()).toBe(4)
      })

      test('The corresponding number without the positive offset', () => {
        expect(loopCounter.set(max + 1).get()).toBe(min)
      })

      test('The corresponding number without the negative offset', () => {
        expect(loopCounter.set(min - 1).get()).toBe(max)
      })
    })

    describe('Given number is', () => {
      test('Added if it is positive', () => {
        expect(loopCounter.add(3).get()).toBe(max)
      })

      test('Subtracted if it is negative', () => {
        expect(loopCounter.add(-2).get()).toBe(min)
      })
    })

    describe('The corresponding number without the offset', () => {
      test('If given number + current value is greater than MAX', () => {
        expect(loopCounter.add(4).get()).toBe(min)
      })

      test('If given number + current value is less than MIN', () => {
        expect(loopCounter.add(-3).get()).toBe(max)
      })
    })

    describe('Clones the current counter', () => {
      test('Into a new instance', () => {
        expect(loopCounter.clone()).not.toBe(loopCounter)
      })

      test('And preserves its current value', () => {
        expect(loopCounter.clone().get()).toBe(start)
      })
    })
  })
})
