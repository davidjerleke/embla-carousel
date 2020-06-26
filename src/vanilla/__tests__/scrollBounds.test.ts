import { Animation } from '../components/animation'
import { ScrollBounds } from '../components/scrollBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { ScrollBody } from '../components/scrollBody'

let scrollBounds: ScrollBounds
let location: Vector1D
let vector: Vector1D
let scrollBody: ScrollBody

const animation = Animation(() => 1)
const tolerance = 50
const vectorValue = 20
const minLimit = -10
const maxLimit = 10
const lessThanMinLimit = minLimit - 0.01
const moreThanMaxLimit = maxLimit + 0.01
const limit = Limit({
  min: minLimit,
  max: maxLimit,
})

beforeEach(() => {
  vector = Vector1D(vectorValue)
  location = Vector1D(0)
  scrollBody = ScrollBody({
    location,
    mass: 1,
    speed: 10,
  })
  scrollBounds = ScrollBounds({
    limit,
    location,
    scrollBody,
    animation,
  })
})

describe('ScrollBounds', () => {
  describe('Constrains vector to limit', () => {
    test('Min when location < limit min', done => {
      vector.multiply(-1)
      location.set(lessThanMinLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(minLimit)
        done()
      }, tolerance)
    })

    test('Max when location > limit max', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(maxLimit)
        done()
      }, tolerance)
    })

    test('Toggled inactive and then active', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.toggleActive(false)
      scrollBounds.toggleActive(true)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(maxLimit)
        done()
      }, tolerance)
    })
  })

  describe('Does not constrain vector when', () => {
    test('Location is within limit min', done => {
      location.set(minLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })

    test('Location is within limit max', done => {
      location.set(maxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })

    test('Toggled inactive', done => {
      location.set(moreThanMaxLimit)
      scrollBounds.toggleActive(false)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })
  })
})
