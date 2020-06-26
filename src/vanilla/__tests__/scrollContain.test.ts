import { Alignment, AlignmentOption } from '../components/alignment'
import { ScrollContain } from '../components/scrollContain'
import { ScrollSnap } from '../components/scrollSnap'
import { arrayKeys } from '../components/utils'

const viewSize = 100
const exceedsView = [20, 24, 31, 25, 36, 15]
const doesNotExceedView = [20, 20]
const equalsView = [50, 50]

const getScrollSnaps = (
  snapSizes: number[],
  align: AlignmentOption,
): number[] => {
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignment, loop: false })
  return arrayKeys(snapSizes).map(scrollSnap.measure)
}

const getScrollContain = (
  snapSizes: number[],
  align: AlignmentOption,
): ScrollContain => {
  const contentSize = snapSizes.reduce((a, s) => a + s, 0)
  const alignment = Alignment({ align, viewSize })
  return ScrollContain({ contentSize, alignment, viewSize })
}

describe('ScrollContain', () => {
  test('Trims duplicate snaps', () => {
    const scrollSnaps = getScrollSnaps(exceedsView, 'start')
    const contain = getScrollContain(exceedsView, 'start')
    const containedSnaps = contain.measure(scrollSnaps, true)
    expect(containedSnaps).toEqual([0, -20, -44, -51])
  })

  test('Aligns to start when content equals view', () => {
    const scrollSnaps = getScrollSnaps(equalsView, 'end')
    const contain = getScrollContain(equalsView, 'end')
    const containedSnaps = contain.measure(scrollSnaps, false)
    expect(containedSnaps).toEqual([0])
  })

  describe('Contains snaps correctly when align is start and content', () => {
    const align = 'start'

    test('Exceeds view', () => {
      const scrollSnaps = getScrollSnaps(exceedsView, align)
      const contain = getScrollContain(exceedsView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([0, -20, -44, -51, -51, -51])
    })

    test('Doesn`t exceed view', () => {
      const scrollSnaps = getScrollSnaps(doesNotExceedView, align)
      const contain = getScrollContain(doesNotExceedView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([0])
    })
  })

  describe('Contains snaps correctly when align is center and content', () => {
    const align = 'center'

    test('Exceeds view', () => {
      const scrollSnaps = getScrollSnaps(exceedsView, align)
      const contain = getScrollContain(exceedsView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([0, 0, -9.5, -37.5, -51, -51])
    })

    test('Doesn`t exceed view', () => {
      const scrollSnaps = getScrollSnaps(doesNotExceedView, align)
      const contain = getScrollContain(doesNotExceedView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([30])
    })
  })

  describe('Contains snaps correctly when align is end and content', () => {
    const align = 'end'

    test('Exceeds view', () => {
      const scrollSnaps = getScrollSnaps(exceedsView, align)
      const contain = getScrollContain(exceedsView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([0, 0, 0, 0, -36, -51])
    })

    test('Doesn`t exceed view', () => {
      const scrollSnaps = getScrollSnaps(doesNotExceedView, align)
      const contain = getScrollContain(doesNotExceedView, align)
      const containedSnaps = contain.measure(scrollSnaps, false)
      expect(containedSnaps).toEqual([60])
    })
  })
})
