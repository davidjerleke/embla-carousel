import { Animation } from '../components/animation'
import { VectorBounds } from '../components/vectorBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { Mover } from '../components/mover'

let vectorBounds: VectorBounds
let location: Vector1D
let mover: Mover
const animation = Animation(() => {})
const limit = Limit({ low: 0, high: 10 })
const tolerance = 50

beforeEach(() => {
  location = Vector1D(0)
  mover = Mover({
    location,
    mass: 3,
    maxForce: 100,
    speed: 10,
  })
  vectorBounds = VectorBounds({
    limit,
    location,
    mover,
    animation,
    tolerance,
  })
})

describe('VectorBounds', () => {
  test('Constrains given Vector to Bound low when location is less than low', done => {
    const vector = Vector1D(-20)
    const locationPastLowLimit = limit.low - 1
    location.setNumber(locationPastLowLimit)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(0)
      done()
    }, tolerance)
  })

  test('Constrains given Vector to Bound high when location is greater than high', done => {
    const vector = Vector1D(20)
    const locationPastHighLimit = limit.high + 1
    location.setNumber(locationPastHighLimit)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(10)
      done()
    }, tolerance)
  })

  test('Does not change given Vector when location is within Bounds', done => {
    const vector = Vector1D(20)
    const locationWithinHighLimit = limit.high
    location.setNumber(locationWithinHighLimit)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(20)
      done()
    }, tolerance)
  })
})
