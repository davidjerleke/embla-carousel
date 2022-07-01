import { ScrollBounds } from '../components/ScrollBounds'
import { Vector1D } from '../components/Vector1d'
import { Limit } from '../components/Limit'
import { ScrollBody } from '../components/ScrollBody'
import { PercentOfView } from '../components/PercentOfView'

const pointerIsDown = true
const pointerIsNotDown = false
const percentOfView = PercentOfView(100)
const pullBackThreshold = percentOfView.measure(10)
const limit = Limit(-10, 10)
const lessThanMinLimit = limit.min - 0.01
const moreThanMaxLimit = limit.max + 0.01
const moreThanMinLimit = limit.min + 0.01
const lessThanMaxLimit = limit.max - 0.01
const location = Vector1D(0)
const target = Vector1D(0)
const scrollBody = ScrollBody(location, 10, 1)
const scrollBounds = ScrollBounds(
  limit,
  location,
  target,
  scrollBody,
  percentOfView,
)

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
        scrollBounds.constrain(pointerIsNotDown)
        expect(target.get()).toBe(limit.min)
      })

      test('Does not pull back if pointer is down', () => {
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBeLessThan(limit.min)
      })

      test('Does not pull back if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(pointerIsNotDown)
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBe(withinPullBackThreshold)
      })
    })

    describe('And diff to target > pullBackThreshold, it applies', () => {
      beforeEach(() => {
        location.set(lessThanMinLimit)
        target.set(pastPullBackThreshold)
      })

      test('Friction if pointer is not down', () => {
        scrollBounds.constrain(pointerIsNotDown)
        expect(target.get()).toBeLessThan(lessThanMinLimit)
        expect(target.get()).toBeGreaterThan(pastPullBackThreshold)
      })

      test('Friction if pointer is down', () => {
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBeLessThan(lessThanMinLimit)
        expect(target.get()).toBeGreaterThan(pastPullBackThreshold)
      })

      test('No friction if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(pointerIsNotDown)
        scrollBounds.constrain(pointerIsDown)
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
        scrollBounds.constrain(pointerIsNotDown)
        expect(target.get()).toBe(limit.max)
      })

      test('Does not pull back if pointer is down', () => {
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBeGreaterThan(limit.max)
      })

      test('Does not pull back if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(pointerIsNotDown)
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBe(withinPullBackThreshold)
      })
    })

    describe('And diff to target > pullBackThreshold, it applies', () => {
      beforeEach(() => {
        location.set(moreThanMaxLimit)
        target.set(pastPullBackThreshold)
      })

      test('Friction if pointer is not down', () => {
        scrollBounds.constrain(pointerIsNotDown)
        expect(target.get()).toBeGreaterThan(moreThanMaxLimit)
        expect(target.get()).toBeLessThan(pastPullBackThreshold)
      })

      test('Friction if pointer is down', () => {
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBeGreaterThan(moreThanMaxLimit)
        expect(target.get()).toBeLessThan(pastPullBackThreshold)
      })

      test('No friction if toggled inactive', () => {
        scrollBounds.toggleActive(false)
        scrollBounds.constrain(pointerIsNotDown)
        scrollBounds.constrain(pointerIsDown)
        expect(target.get()).toBe(pastPullBackThreshold)
      })
    })
  })

  describe('It does not do anything when', () => {
    test('Location < limit min and target is limit min', () => {
      location.set(lessThanMinLimit)
      target.set(limit.min)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(limit.min)
    })

    test('Location < limit min and target > limit min', () => {
      location.set(lessThanMinLimit)
      target.set(moreThanMinLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(moreThanMinLimit)
    })

    test('Target < limit min and location is limit min', () => {
      location.set(limit.min)
      target.set(lessThanMinLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(lessThanMinLimit)
    })

    test('Target < limit min and location > limit min', () => {
      location.set(moreThanMinLimit)
      target.set(lessThanMinLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(lessThanMinLimit)
    })

    test('Location > limit max and target is limit max', () => {
      location.set(moreThanMaxLimit)
      target.set(limit.max)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(limit.max)
    })

    test('Location > limit max and target < limit max', () => {
      location.set(moreThanMaxLimit)
      target.set(lessThanMaxLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(lessThanMaxLimit)
    })

    test('Target > limit max and location is limit max', () => {
      location.set(limit.max)
      target.set(moreThanMaxLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(moreThanMaxLimit)
    })

    test('Target < limit max and location > limit min', () => {
      location.set(lessThanMaxLimit)
      target.set(moreThanMaxLimit)
      scrollBounds.constrain(pointerIsNotDown)
      scrollBounds.constrain(pointerIsDown)
      expect(target.get()).toBe(moreThanMaxLimit)
    })
  })
})
