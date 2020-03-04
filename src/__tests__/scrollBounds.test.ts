import { Animation } from '../components/animation'
import { ScrollBounds } from '../components/scrollBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { ScrollBody } from '../components/scrollBody'

let scrollBounds: ScrollBounds
let location: Vector1D
let scrollBody: ScrollBody
const animation = Animation(() => {})
const initialVectorValue = 20
const tolerance = 50
const minLimit = 0
const maxLimit = 10
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
    tolerance,
  })
})

describe('ScrollBounds', () => {
  describe('Constrains', () => {
    test('Vector to bound min when location < bound min', done => {
      const vector = Vector1D(-initialVectorValue)
      const locationPastMinLimit = limit.min - 1
      location.set(locationPastMinLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(minLimit)
        done()
      }, tolerance)
    })

    test('Vector to bound max when location > bound max', done => {
      const vector = Vector1D(initialVectorValue)
      const locationPastMaxLimit = limit.max + 1
      location.set(locationPastMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(maxLimit)
        done()
      }, tolerance)
    })
  })

  describe('Does not constrain', () => {
    test('Vector when location is within bound min and max', done => {
      const vector = Vector1D(initialVectorValue)
      const locationWithinMaxLimit = limit.max
      location.set(locationWithinMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(initialVectorValue)
        done()
      }, tolerance)
    })
  })
})
