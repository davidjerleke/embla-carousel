import { AlignSize, Alignments } from '../components/alignSize'
import { Counter } from '../components/counter'
import { Limit } from '../components/limit'
import { SnapPosition } from '../components/snapPosition'

const viewSize = 100
const limit = Limit({ min: 0, max: 4 })
const index = Counter({ start: 0, limit, loop: false })

const snapPositionParams = (
  align: Alignments,
  contain: boolean,
  snapSizes: number[] = [80, 24, 61, 55, 76, 15],
) => ({
  index,
  alignSize: AlignSize({ viewSize, align }),
  contentSize: snapSizes.reduce((a, s) => a + s),
  snapSizes,
  contain,
  viewSize,
})

describe('SnapPosition', () => {
  describe('Align Start', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = snapPositionParams('start', false)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([0, -80, -104, -165, -220, -296])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = snapPositionParams('start', true)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([0, -80, -104, -165, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = snapPositionParams('start', true, snapSizes)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([0, 0, 0, 0, 0, 0])
    })
  })

  describe('Align Center', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = snapPositionParams('center', false)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([10, -42, -84.5, -142.5, -208, -284])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = snapPositionParams('center', true)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([0, -42, -84.5, -142.5, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = snapPositionParams('center', true, snapSizes)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([20, 20, 20, 20, 20, 20])
    })
  })

  describe('Align End', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = snapPositionParams('end', false)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([20, -4, -65, -120, -196, -272])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = snapPositionParams('end', true)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([0, -4, -65, -120, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = snapPositionParams('end', true, snapSizes)
      const snapPosition = SnapPosition(params)
      const positions = params.snapSizes.map(snapPosition.measure)
      expect(positions).toEqual([40, 40, 40, 40, 40, 40])
    })
  })
})
