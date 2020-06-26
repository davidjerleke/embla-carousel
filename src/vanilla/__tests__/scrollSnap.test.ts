import { Alignment, AlignmentOption } from '../components/alignment'
import { ScrollSnap } from '../components/scrollSnap'
import { arrayKeys } from '../components/utils'

const viewSize = 100
const snapSizes = [80, 24, 61, 55, 76, 15]
const snapIndexes = arrayKeys(snapSizes)

const getScrollSnap = (align: AlignmentOption): ScrollSnap => {
  const alignment = Alignment({ align, viewSize })
  return ScrollSnap({ alignment, snapSizes, loop: false })
}

describe('ScrollSnap', () => {
  describe('Calculates correct snap locations when align is', () => {
    test('Start', () => {
      const scrollSnap = getScrollSnap('start')
      const snaps = snapIndexes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, -80, -104, -165, -220, -296])
    })

    test('Center', () => {
      const scrollSnap = getScrollSnap('center')
      const snaps = snapIndexes.map(scrollSnap.measure)
      expect(snaps).toEqual([10, -42, -84.5, -142.5, -208, -253.5])
    })

    test('End', () => {
      const scrollSnap = getScrollSnap('end')
      const snaps = snapIndexes.map(scrollSnap.measure)
      expect(snaps).toEqual([20, -4, -65, -120, -196, -211])
    })
  })
})
