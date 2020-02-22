import { Alignment, Alignments } from '../components/alignment'
import { ScrollContain } from '../components/scrollContain'
import { ScrollSnap } from '../components/scrollSnap'

const exceedsView = [20, 24, 31, 25, 36, 15]
const doesntExceedView = [15, 20, 15]
const equalsView = [50, 50]

const contained = (align: Alignments, snapSizes: number[]) => {
  const viewSize = 100
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({ snapSizes, alignment, loop: false })
  const defaultSnaps = snapSizes.map(scrollSnap.measure)
  const scrollContain = ScrollContain({
    slideIndexes: Object.keys(snapSizes).map(Number),
    contentSize: snapSizes.reduce((a, s) => a + s, 0),
    slidesToScroll: 1,
    alignment,
    viewSize,
  })
  return {
    snaps: scrollContain.snaps(defaultSnaps),
    indexes: scrollContain.indexes(defaultSnaps),
  }
}

describe('ScrollContain', () => {
  describe('Align Start', () => {
    test('Calculates correct snaps & indexes when content exceeds view', () => {
      const { snaps, indexes } = contained('start', exceedsView)
      expect(snaps).toEqual([0, -20, -44, -51])
      expect(indexes).toEqual([[0], [1], [2], [3, 4, 5]])
    })
    test('Calculates correct snaps & indexes when content doesn`t exceed view', () => {
      const { snaps, indexes } = contained('start', doesntExceedView)
      expect(snaps).toEqual([0])
      expect(indexes).toEqual([[0, 1, 2]])
    })
    test('Calculates correct snaps & indexes when content equals view', () => {
      const { snaps, indexes } = contained('start', equalsView)
      expect(snaps).toEqual([0])
      expect(indexes).toEqual([[0, 1]])
    })
  })

  describe('Align Center', () => {
    test('Calculates correct snaps & indexes when content exceeds view', () => {
      const { snaps, indexes } = contained('center', exceedsView)
      expect(snaps).toEqual([0, -9.5, -37.5, -51])
      expect(indexes).toEqual([[0, 1], [2], [3], [4, 5]])
    })
    test('Calculates correct snaps & indexes when content doesn`t exceed view', () => {
      const { snaps, indexes } = contained('center', doesntExceedView)
      expect(snaps).toEqual([25])
      expect(indexes).toEqual([[0, 1, 2]])
    })
    test('Calculates correct snaps & indexes when content equals view', () => {
      const { snaps, indexes } = contained('center', equalsView)
      expect(snaps).toEqual([0])
      expect(indexes).toEqual([[0, 1]])
    })
  })

  describe('Align End', () => {
    test('Calculates correct snaps & indexes when content exceeds view', () => {
      const { snaps, indexes } = contained('end', exceedsView)
      expect(snaps).toEqual([0, -36, -51])
      expect(indexes).toEqual([[0, 1, 2, 3], [4], [5]])
    })
    test('Calculates correct snaps & indexes when content doesn`t exceed view', () => {
      const { snaps, indexes } = contained('end', doesntExceedView)
      expect(snaps).toEqual([50])
      expect(indexes).toEqual([[0, 1, 2]])
    })
    test('Calculates correct snaps & indexes when content equals view', () => {
      const { snaps, indexes } = contained('end', equalsView)
      expect(snaps).toEqual([0])
      expect(indexes).toEqual([[0, 1]])
    })
  })
})
