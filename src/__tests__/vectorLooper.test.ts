import { VectorLooper } from '../components/vectorLooper'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'

let location: Vector1D
let vectors: Vector1D[]
let vectorLooper: VectorLooper
const lowLimit = 0
const highLimit = 10
const span = 10
const limit = Limit({ low: lowLimit, high: highLimit })
const vector_1_initial_value = 5
const vector_2_initial_value = 10

beforeEach(() => {
  location = Vector1D(0)
  vectors = [
    Vector1D(vector_1_initial_value),
    Vector1D(vector_2_initial_value),
  ]
  vectorLooper = VectorLooper({
    limit,
    location,
    span,
    vectors,
  })
})

describe('VectorLooper', () => {
  test('Subtracts span size from given Vectors when location is greater than Limit high', () => {
    const direction = 1
    location.setNumber(highLimit + 1)
    vectorLooper.loop(direction)
    expect(vectors[0].get()).toBe(vector_1_initial_value - span)
    expect(vectors[1].get()).toBe(vector_2_initial_value - span)
  })

  test('Adds span size to given Vectors when location is less than Limit low', () => {
    const direction = -1
    location.setNumber(lowLimit - 1)
    vectorLooper.loop(direction)
    expect(vectors[0].get()).toBe(vector_1_initial_value + span)
    expect(vectors[1].get()).toBe(vector_2_initial_value + span)
  })
})
