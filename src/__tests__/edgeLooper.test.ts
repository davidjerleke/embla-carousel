import { EdgeLooper } from '../components/edgeLooper'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'

let location: Vector1D
let vectors: Vector1D[]
let edgeLooper: EdgeLooper
const minLimit = 0
const maxLimit = 10
const contentSize = 10
const limit = Limit({ min: minLimit, max: maxLimit })
const vector_1_initial_value = 5
const vector_2_initial_value = 10

beforeEach(() => {
  location = Vector1D(0)
  vectors = [
    Vector1D(vector_1_initial_value),
    Vector1D(vector_2_initial_value),
  ]
  edgeLooper = EdgeLooper({
    limit,
    location,
    contentSize,
    vectors,
  })
})

describe('EdgeLooper', () => {
  test('Subtracts content size from given Vectors when location is greater than Limit max', () => {
    const direction = 1
    location.setNumber(maxLimit + 1)
    edgeLooper.loop(direction)
    expect(vectors[0].get()).toBe(
      vector_1_initial_value - contentSize,
    )
    expect(vectors[1].get()).toBe(
      vector_2_initial_value - contentSize,
    )
  })

  test('Adds content size to given Vectors when location is less than Limit min', () => {
    const direction = -1
    location.setNumber(minLimit - 1)
    edgeLooper.loop(direction)
    expect(vectors[0].get()).toBe(
      vector_1_initial_value + contentSize,
    )
    expect(vectors[1].get()).toBe(
      vector_2_initial_value + contentSize,
    )
  })
})
