import { AlignSize, Alignments } from '../components/alignSize'
import { ScrollContain } from '../components/scrollContain'
import { ScrollSnap } from '../components/scrollSnap'

const doesFillView = [20, 24, 31, 25, 36, 15]
const doesNotFillView = [15, 20, 15]

const contained = (align: Alignments, snapSizes: number[]) => {
  const viewSize = 100
  const alignSize = AlignSize({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignSize, loop: false })
  const defaultSnaps = snapSizes.map(scrollSnap.measure)
  const scrollContain = ScrollContain({
    slideIndexes: Object.keys(snapSizes).map(Number),
    contentSize: snapSizes.reduce((a, s) => a + s, 0),
    slidesToScroll: 1,
    alignSize,
    viewSize,
  })
  return {
    snaps: scrollContain.snaps(defaultSnaps),
    indexes: scrollContain.indexes(defaultSnaps),
  }
}

describe('ScrollContain', () => {
  describe('Align Start', () => {
    test('Calculates correct snaps & indexes when content fills view', () => {
      const { snaps, indexes } = contained('start', doesFillView)
      expect(snaps).toEqual([0, -20, -44, -51])
      expect(indexes).toEqual([[0], [1], [2], [3, 4, 5]])
    })
    test('Calculates correct snaps & indexes when content does not fill view', () => {
      const { snaps, indexes } = contained('start', doesNotFillView)
      expect(snaps).toEqual([0])
      expect(indexes).toEqual([[0, 1, 2]])
    })
  })

  describe('Align Center', () => {
    test('Calculates correct snaps & indexes when content fills view', () => {
      const { snaps, indexes } = contained('center', doesFillView)
      expect(snaps).toEqual([0, -9.5, -37.5, -51])
      expect(indexes).toEqual([[0, 1], [2], [3], [4, 5]])
    })
    test('Calculates correct snaps & indexes when content does not fill view', () => {
      const { snaps, indexes } = contained('center', doesNotFillView)
      expect(snaps).toEqual([25])
      expect(indexes).toEqual([[0, 1, 2]])
    })
  })

  describe('Align End', () => {
    test('Calculates correct snaps & indexes when content fills view', () => {
      const { snaps, indexes } = contained('end', doesFillView)
      expect(snaps).toEqual([0, -36, -51])
      expect(indexes).toEqual([[0, 1, 2, 3], [4], [5]])
    })
    test('Calculates correct snaps & indexes when content does not fill view', () => {
      const { snaps, indexes } = contained('end', doesNotFillView)
      expect(snaps).toEqual([50])
      expect(indexes).toEqual([[0, 1, 2]])
    })
  })
})
