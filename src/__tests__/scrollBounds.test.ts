import { Animation } from '../components/animation'
import { ScrollBounds } from '../components/scrollBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { ScrollBody } from '../components/scrollBody'

let scrollBounds: ScrollBounds
let location: Vector1D
let scrollBody: ScrollBody

const animation = Animation(() => {})
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
      const vector = Vector1D(-vectorValue)
      location.set(lessThanMinLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(minLimit)
        done()
      }, tolerance)
    })

    test('Max when location > limit max', done => {
      const vector = Vector1D(vectorValue)
      location.set(moreThanMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(maxLimit)
        done()
      }, tolerance)
    })
  })

  describe('Does not constrain vector when', () => {
    test('Location is within limit min', done => {
      const vector = Vector1D(vectorValue)
      location.set(minLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })

    test('Location is within limit max', done => {
      const vector = Vector1D(vectorValue)
      location.set(maxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })
  })
})
