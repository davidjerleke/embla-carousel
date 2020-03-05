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
const lessThanMinLimit = minLimit - 1
const moreThanMaxLimit = maxLimit + 1
const withinMinMaxLimit = minLimit + maxLimit
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
      const vector = Vector1D(-vectorValue)
      location.set(lessThanMinLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(minLimit)
        done()
      }, tolerance)
    })

    test('Vector to bound max when location > bound max', done => {
      const vector = Vector1D(vectorValue)
      location.set(moreThanMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(maxLimit)
        done()
      }, tolerance)
    })
  })

  describe('Does not constrain', () => {
    test('Vector when location is within bound min and max', done => {
      const vector = Vector1D(vectorValue)
      location.set(withinMinMaxLimit)
      scrollBounds.constrain(vector)

      setTimeout(() => {
        expect(vector.get()).toBe(vectorValue)
        done()
      }, tolerance)
    })
  })
})
