import { AlignSize, Alignments } from '../components/alignSize'
import { ChunkSize } from '../components/chunkSize'
import { InfiniteShifter } from '../components/infiniteShifter'
import { Vector1D } from '../components/vector1d'

const shifterParams = (align: Alignments) => {
  const location = Vector1D(0)
  const chunkSize = ChunkSize(950)
  const viewSize = chunkSize.root
  const alignSize = AlignSize({ align, viewSize })
  const slideSizes = [15, 30, 15, 15, 70, 15, 15, 15]
  const alignSizes = slideSizes.map(alignSize.measure)
  const contentSize = slideSizes.reduce((a, s) => a + s)
  return { alignSizes, viewSize, contentSize, slideSizes, location }
}

describe('InfiniteShifter', () => {
  describe('Start Alignment', () => {
    test('ShiftPoints are correct when given alignment is Start', () => {
      const params = shifterParams('start')
      const { shiftPoints } = InfiniteShifter(params)
      expect(shiftPoints).toMatchObject([
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
        { index: 3, point: -150 },
        { index: 4, point: -165 },
      ])
    })
    test('ShiftTargets are correct when given alignment is Start', () => {
      const params = shifterParams('start')
      const { shiftPoints } = InfiniteShifter(params)
      const parentLocation = params.alignSizes[0]
      const shiftTargets = shiftPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(shiftTargets).toEqual([0, 0, 0, 0, 0])
    })
  })

  describe('Center Alignment', () => {
    test('ShiftPoints are correct when given alignment is Center', () => {
      const params = shifterParams('center')
      const { shiftPoints } = InfiniteShifter(params)
      expect(shiftPoints).toMatchObject([
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
      ])
    })
    test('ShiftTargets are correct when given alignment is Center', () => {
      const params = shifterParams('center')
      const { shiftPoints } = InfiniteShifter(params)
      const parentLocation = params.alignSizes[0]
      const shiftTargets = shiftPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(shiftTargets).toEqual([-190, -190, -190, 0, 0, 0])
    })
  })

  describe('End Alignment', () => {
    test('ShiftPoints are correct when given alignment is End', () => {
      const params = shifterParams('end')
      const { shiftPoints } = InfiniteShifter(params)
      expect(shiftPoints).toMatchObject([
        { index: 4, point: 45 },
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
      ])
    })
    test('ShiftTargets are correct when given alignment is End', () => {
      const params = shifterParams('end')
      const { shiftPoints } = InfiniteShifter(params)
      const parentLocation = params.alignSizes[0]
      const shiftTargets = shiftPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(shiftTargets).toEqual([-190, -190, -190, -190, 0])
    })
  })
})
