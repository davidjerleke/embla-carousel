import { Animation } from '../components/animation'
import { EdgeGuard } from '../components/edgeGuard'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { Mover } from '../components/mover'

let edgeGuard: EdgeGuard
let location: Vector1D
let mover: Mover
const animation = Animation(() => {})
const limit = Limit({ min: 0, max: 10 })
const tolerance = 50

beforeEach(() => {
  location = Vector1D(0)
  mover = Mover({ location, mass: 1, speed: 10 })
  edgeGuard = EdgeGuard({
    limit,
    location,
    mover,
    animation,
    tolerance,
  })
})

describe('EdgeGuard', () => {
  test('Constrains given Vector to Bound min when location is less than min', done => {
    const vector = Vector1D(-20)
    const locationPastMinLimit = limit.min - 1
    location.setNumber(locationPastMinLimit)
    edgeGuard.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(0)
      done()
    }, tolerance)
  })

  test('Constrains given Vector to Bound max when location is greater than max', done => {
    const vector = Vector1D(20)
    const locationPastMaxLimit = limit.max + 1
    location.setNumber(locationPastMaxLimit)
    edgeGuard.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(10)
      done()
    }, tolerance)
  })

  test('Does not change given Vector when location is within Bounds', done => {
    const vector = Vector1D(20)
    const locationWithinMaxLimit = limit.max
    location.setNumber(locationWithinMaxLimit)
    edgeGuard.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(20)
      done()
    }, tolerance)
  })
})
