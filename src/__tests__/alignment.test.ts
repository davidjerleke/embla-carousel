import { Alignment, Alignments } from '../components/alignment'

const viewSize = 100
const itemSize = 50
const startAlign = 0
const centerAlign = (viewSize - itemSize) / 2
const endAlign = viewSize - itemSize

const getAlignment = (align: Alignments): Alignment => {
  return Alignment({ align, viewSize })
}

describe('Alignment', () => {
  test('Start is correctly measured relative to view for given size', () => {
    const alignment = getAlignment('start')
    const measurement = alignment.measure(itemSize)
    expect(measurement).toBe(startAlign)
  })

  test('Center is correctly measured relative to view for given size', () => {
    const alignment = getAlignment('center')
    const measurement = alignment.measure(itemSize)
    expect(measurement).toBe(centerAlign)
  })

  test('End is correctly measured relative to view for given size', () => {
    const alignment = getAlignment('end')
    const measurement = alignment.measure(itemSize)
    expect(measurement).toBe(endAlign)
  })
})
