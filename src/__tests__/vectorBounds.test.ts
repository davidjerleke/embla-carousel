import { VectorBounds } from '../components/vectorBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { Mover } from '../components/mover'

let vectorBounds: VectorBounds
let location: Vector1D
let mover: Mover
const limit = Limit({ low: 0, high: 10 })
const timeout = 41

beforeEach(() => {
  location = Vector1D(0)
  mover = Mover({
    location,
    mass: 3,
    maxForce: 100,
    speed: 10,
  })
  vectorBounds = VectorBounds({ limit, location, mover })
})

describe('VectorBounds', () => {
  test('Constrains given Vector to Bound low when location is less than low', done => {
    const vector = Vector1D(-20)
    location.setNumber(-20)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(0)
      done()
    }, timeout)
  })

  test('Constrains given Vector to Bound high when location is greater than high', done => {
    const vector = Vector1D(20)
    location.setNumber(20)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(10)
      done()
    }, timeout)
  })

  test('Does not change given Vector when location is within Bounds', done => {
    const vector = Vector1D(5)
    location.setNumber(5)
    vectorBounds.constrain(vector)

    setTimeout(() => {
      expect(vector.get()).toBe(5)
      done()
    }, timeout)
  })
})
