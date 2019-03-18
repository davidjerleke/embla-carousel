import { ChunkSize } from '../components/chunkSize'

let chunkSize: ChunkSize
const root = 1000
const itemSize = 25

beforeEach(() => {
  chunkSize = ChunkSize(root)
})

describe('ChunkSize', () => {
  test('Exposes correct root size', () => {
    expect(chunkSize.getRoot).toBe(100)
  })

  test('Measures given number relative to root', () => {
    const measure = chunkSize.measure(itemSize)
    expect(measure).toBe(2.5)
  })
})
