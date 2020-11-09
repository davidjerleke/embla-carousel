import { Animation } from '../components/animation'
import { ScrollBounds } from '../components/scrollBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { ScrollBody } from '../components/scrollBody'

const tolerance = 70
const initialTarget = 20
const limit = Limit({ min: -10, max: 10 })
const lessThanMinLimit = limit.min - 0.01
const moreThanMaxLimit = limit.max + 0.01
const location = Vector1D(0)
const target = Vector1D(initialTarget)
const animation = Animation(() => 1)
const scrollBody = ScrollBody({
  location,
  mass: 1,
  speed: 10,
})
const scrollBounds = ScrollBounds({
  animation,
  limit,
  location,
  scrollBody,
})

beforeEach(() => {
  target.set(initialTarget)
})

describe('ScrollBounds', () => {
  describe('Constrains vector to limit', () => {
    test('Min when location < limit min', done => {
      location.set(lessThanMinLimit)
      scrollBounds.constrain(target.multiply(-1))

      setTimeout(() => {
        expect(target.get()).toBe(limit.min)
        done()
      }, tolerance)
    })

    test('Max when location > limit max', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.constrain(target)

      setTimeout(() => {
        expect(target.get()).toBe(limit.max)
        done()
      }, tolerance)
    })

    test('Toggled active', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.toggleActive(false)
      scrollBounds.toggleActive(true)
      scrollBounds.constrain(target)

      setTimeout(() => {
        expect(target.get()).toBe(limit.max)
        done()
      }, tolerance)
    })
  })

  describe('Does not constrain vector when', () => {
    test('Location is within limit min', done => {
      location.set(limit.min)
      scrollBounds.constrain(target)

      setTimeout(() => {
        expect(target.get()).toBe(initialTarget)
        done()
      }, tolerance)
    })

    test('Location is within limit max', done => {
      location.set(limit.max)
      scrollBounds.constrain(target)

      setTimeout(() => {
        expect(target.get()).toBe(initialTarget)
        done()
      }, tolerance)
    })

    test('Toggled inactive', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.toggleActive(true)
      scrollBounds.toggleActive(false)
      scrollBounds.constrain(target)

      setTimeout(() => {
        expect(target.get()).toBe(initialTarget)
        done()
      }, tolerance)
    })
  })
})
