import { AlignSize, Alignments } from '../components/alignSize'
import { ChunkSize } from '../components/chunkSize'
import { SlideLooper } from '../components/slideLooper'
import { Vector1D } from '../components/vector1d'

const slideLooperParams = (align: Alignments) => {
  const location = Vector1D(0)
  const chunkSize = ChunkSize(950)
  const viewSize = chunkSize.root
  const alignSize = AlignSize({ align, viewSize })
  const slideSizes = [15, 30, 15, 15, 70, 15, 15, 15]
  const scrollSnaps = slideSizes.map(alignSize.measure)
  const contentSize = slideSizes.reduce((a, s) => a + s)
  return {
    scrollSnaps,
    viewSize,
    contentSize,
    slideSizes,
    location,
  }
}

describe('SlideLooper', () => {
  describe('Align Start', () => {
    test('LoopPoints are correct when given alignment is Start', () => {
      const params = slideLooperParams('start')
      const { loopPoints } = SlideLooper(params)
      expect(loopPoints).toMatchObject([
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
        { index: 3, point: -150 },
        { index: 4, point: -165 },
      ])
    })
    test('LoopTargets are correct when given alignment is Start', () => {
      const params = slideLooperParams('start')
      const { loopPoints } = SlideLooper(params)
      const parentLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(loopTargets).toEqual([0, 0, 0, 0, 0])
    })
  })

  describe('Align Center', () => {
    test('LoopPoints are correct when given alignment is Center', () => {
      const params = slideLooperParams('center')
      const { loopPoints } = SlideLooper(params)
      expect(loopPoints).toMatchObject([
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
      ])
    })
    test('LoopTargets are correct when given alignment is Center', () => {
      const params = slideLooperParams('center')
      const { loopPoints } = SlideLooper(params)
      const parentLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(loopTargets).toEqual([-190, -190, -190, 0, 0, 0])
    })
  })

  describe('Align End', () => {
    test('LoopPoints are correct when given alignment is End', () => {
      const params = slideLooperParams('end')
      const { loopPoints } = SlideLooper(params)
      expect(loopPoints).toMatchObject([
        { index: 4, point: 45 },
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
      ])
    })
    test('LoopTargets are correct when given alignment is End', () => {
      const params = slideLooperParams('end')
      const { loopPoints } = SlideLooper(params)
      const parentLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ findTarget }) =>
        findTarget(parentLocation).get(),
      )
      expect(loopTargets).toEqual([-190, -190, -190, -190, 0])
    })
  })
})
