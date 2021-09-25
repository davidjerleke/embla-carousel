import {
  Alignment,
  AlignmentOptionType,
  AlignmentType,
} from '../components/Alignment'

const viewSize = 100
const itemSize = 50

const startAlign = 0
const centerAlign = 25
const endAlign = 50

const percentFraction = 0.2
const percentAlign = viewSize * percentFraction

const getAlignment = (align: AlignmentOptionType): AlignmentType =>
  Alignment(align, viewSize)

describe('Alignment', () => {
  describe('Is correctly measured relative to view for align', () => {
    test('Start', () => {
      const measurement = getAlignment('start').measure(itemSize)
      expect(measurement).toBe(startAlign)
    })

    test('Center', () => {
      const measurement = getAlignment('center').measure(itemSize)
      expect(measurement).toBe(centerAlign)
    })

    test('End', () => {
      const measurement = getAlignment('end').measure(itemSize)
      expect(measurement).toBe(endAlign)
    })

    test('Percent', () => {
      const measurement = getAlignment(percentFraction).measure(itemSize)
      expect(measurement).toBe(percentAlign)
    })
  })
})
