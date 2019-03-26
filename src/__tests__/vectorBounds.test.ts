import { VectorBounds } from '../components/vectorBounds'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'
import { Mover } from '../components/mover'

let vectorBounds: VectorBounds
let location: Vector1D
let mover: Mover
const limit = Limit({ low: 0, high: 10 })
const offset = 5

beforeEach(() => {
  location = Vector1D(0)
  mover = Mover({
    location,
    mass: 3,
    maxForce: 100,
    speed: 10,
  })
  vectorBounds = VectorBounds({ limit, location, mover, offset })
})

describe('VectorBounds', () => {
  test('Constrains given Vector to Bound low when location is less than low', () => {
    const vector = Vector1D(-20)
    const locationPastLowLimitPlusOffset = limit.low - offset - 1
    location.setNumber(locationPastLowLimitPlusOffset)
    vectorBounds.constrain(vector)
    expect(vector.get()).toBe(0)
  })

  test('Constrains given Vector to Bound high when location is greater than high', () => {
    const vector = Vector1D(20)
    const locationPastHighLimitPlusOffset = limit.high + offset + 1
    location.setNumber(locationPastHighLimitPlusOffset)
    vectorBounds.constrain(vector)
    expect(vector.get()).toBe(10)
  })

  test('Does not change given Vector when location is within Bounds', () => {
    const vector = Vector1D(20)
    const locationWithinHighLimitPlusOffset = limit.high + offset
    location.setNumber(locationWithinHighLimitPlusOffset)
    vectorBounds.constrain(vector)
    expect(vector.get()).toBe(20)
  })
})
