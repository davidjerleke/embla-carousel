import { PxToPercent } from '../components/pxToPercent'
import { ScrollLooper } from '../components/scrollLooper'
import { Vector1D } from '../components/vector1d'
import { Limit } from '../components/limit'

let location: Vector1D
let vectors: Vector1D[]
let scrollLooper: ScrollLooper
const minLimit = 0
const maxLimit = 10
const contentSize = 10
const limit = Limit({ min: minLimit, max: maxLimit })
const pxToPercent = PxToPercent(1000)
const vectorOneInitialValue = 5
const vectorTwoInitialValue = 10

beforeEach(() => {
  location = Vector1D(0)
  vectors = [
    Vector1D(vectorOneInitialValue),
    Vector1D(vectorTwoInitialValue),
  ]
  scrollLooper = ScrollLooper({
    pxToPercent,
    limit,
    location,
    contentSize,
    vectors,
  })
})

describe('ScrollLooper', () => {
  test('Subtracts content size from given Vectors when location is greater than Limit max', () => {
    const direction = 1
    location.set(maxLimit + 1)
    scrollLooper.loop(direction)
    expect(vectors[0].get()).toBe(vectorOneInitialValue - contentSize)
    expect(vectors[1].get()).toBe(vectorTwoInitialValue - contentSize)
  })

  test('Adds content size to given Vectors when location is less than Limit min', () => {
    const direction = -1
    location.set(minLimit - 1)
    scrollLooper.loop(direction)
    expect(vectors[0].get()).toBe(vectorOneInitialValue + contentSize)
    expect(vectors[1].get()).toBe(vectorTwoInitialValue + contentSize)
  })
})
