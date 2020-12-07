import { ScrollBounds } from '../components/scrollBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { ScrollBody } from '../components/scrollBody'

const pointerIsDown = true
const pointerIsNotDown = false
const pullBackThreshold = 10
const limit = Limit({ min: -10, max: 10 })
const lessThanMinLimit = limit.min - 0.01
const moreThanMaxLimit = limit.max + 0.01
const moreThanMinLimit = limit.min + 0.01
const lessThanMaxLimit = limit.max - 0.01
const location = Vector1D(0)
const target = Vector1D(0)
const scrollBody = ScrollBody({ location, mass: 1, speed: 10 })
const scrollBounds = ScrollBounds({ location, limit, scrollBody })

afterEach(() => scrollBounds.toggleActive(true))

describe('ScrollBounds', () => {
  describe('If location and target < limit min', () => {
    const withinPullBackThreshold = lessThanMinLimit - pullBackThreshold
    const pastPullBackThreshold = withinPullBackThreshold - 0.01

    describe('And diff to target < pullBackThreshold, it', () => {
      beforeEach(() => {
        location.set(lessThanMinLimit)
        target.set(withinPullBackThreshold)
      })

      test('Pulls back if pointer is not down', () => {
        scrollBounds.constrain(target, pointerIsNotDown)
        expect(target.get()).toBe(limit.min)
      })

      test('Does not pull back if pointer is down', () => {
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBeLessThan(limit.min)
      })

      test('Does not pull back if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(target, pointerIsNotDown)
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBe(withinPullBackThreshold)
      })
    })

    describe('And diff to target > pullBackThreshold, it applies', () => {
      beforeEach(() => {
        location.set(lessThanMinLimit)
        target.set(pastPullBackThreshold)
      })

      test('Friction if pointer is not down', () => {
        scrollBounds.constrain(target, pointerIsNotDown)
        expect(target.get()).toBeLessThan(lessThanMinLimit)
        expect(target.get()).toBeGreaterThan(pastPullBackThreshold)
      })

      test('Friction if pointer is down', () => {
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBeLessThan(lessThanMinLimit)
        expect(target.get()).toBeGreaterThan(pastPullBackThreshold)
      })

      test('No friction if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(target, pointerIsNotDown)
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBe(pastPullBackThreshold)
      })
    })
  })

  describe('If location and target > limit max', () => {
    const withinPullBackThreshold = moreThanMaxLimit + pullBackThreshold
    const pastPullBackThreshold = withinPullBackThreshold + 0.01

    describe('And diff to target < pullBackThreshold, it', () => {
      beforeEach(() => {
        location.set(moreThanMaxLimit)
        target.set(withinPullBackThreshold)
      })

      test('Pulls back if pointer is not down', () => {
        scrollBounds.constrain(target, pointerIsNotDown)
        expect(target.get()).toBe(limit.max)
      })

      test('Does not pull back if pointer is down', () => {
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBeGreaterThan(limit.max)
      })

      test('Does not pull back if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(target, pointerIsNotDown)
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBe(withinPullBackThreshold)
      })
    })

    describe('And diff to target > pullBackThreshold, it applies', () => {
      beforeEach(() => {
        location.set(moreThanMaxLimit)
        target.set(pastPullBackThreshold)
      })

      test('Friction if pointer is not down', () => {
        scrollBounds.constrain(target, pointerIsNotDown)
        expect(target.get()).toBeGreaterThan(moreThanMaxLimit)
        expect(target.get()).toBeLessThan(pastPullBackThreshold)
      })

      test('Friction if pointer is down', () => {
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBeGreaterThan(moreThanMaxLimit)
        expect(target.get()).toBeLessThan(pastPullBackThreshold)
      })

      test('No friction if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(target, pointerIsNotDown)
        scrollBounds.constrain(target, pointerIsDown)
        expect(target.get()).toBe(pastPullBackThreshold)
      })
    })
  })

  describe('It does not do anything when', () => {
    test('Location < limit min and target is limit min', () => {
      location.set(lessThanMinLimit)
      target.set(limit.min)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(limit.min)
    })

    test('Location < limit min and target > limit min', () => {
      location.set(lessThanMinLimit)
      target.set(moreThanMinLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(moreThanMinLimit)
    })

    test('Target < limit min and location is limit min', () => {
      location.set(limit.min)
      target.set(lessThanMinLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(lessThanMinLimit)
    })

    test('Target < limit min and location > limit min', () => {
      location.set(moreThanMinLimit)
      target.set(lessThanMinLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(lessThanMinLimit)
    })

    test('Location > limit max and target is limit max', () => {
      location.set(moreThanMaxLimit)
      target.set(limit.max)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(limit.max)
    })

    test('Location > limit max and target < limit max', () => {
      location.set(moreThanMaxLimit)
      target.set(lessThanMaxLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(lessThanMaxLimit)
    })

    test('Target > limit max and location is limit max', () => {
      location.set(limit.max)
      target.set(moreThanMaxLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(moreThanMaxLimit)
    })

    test('Target < limit max and location > limit min', () => {
      location.set(lessThanMaxLimit)
      target.set(moreThanMaxLimit)
      scrollBounds.constrain(target, pointerIsNotDown)
      scrollBounds.constrain(target, pointerIsDown)
      expect(target.get()).toBe(moreThanMaxLimit)
    })
  })
})
