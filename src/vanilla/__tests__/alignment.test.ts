import { Alignment, AlignmentOption } from '../components/alignment'

const viewSize = 100
const itemSize = 50

const startAlign = 0
const centerAlign = (viewSize - itemSize) / 2
const endAlign = viewSize - itemSize

const percentFraction = 0.2
const percentAlign = viewSize * percentFraction

const alignment = (align: AlignmentOption): Alignment => {
  return Alignment({ align, viewSize })
}

describe('Alignment', () => {
  describe('Is correctly measured relative to view for align', () => {
    test('Start', () => {
      const measurement = alignment('start').measure(itemSize)
      expect(measurement).toBe(startAlign)
    })

    test('Center', () => {
      const measurement = alignment('center').measure(itemSize)
      expect(measurement).toBe(centerAlign)
    })

    test('End', () => {
      const measurement = alignment('end').measure(itemSize)
      expect(measurement).toBe(endAlign)
    })

    test('Percent', () => {
      const measurement = alignment(percentFraction).measure(itemSize)
      expect(measurement).toBe(percentAlign)
    })
  })
})
