import { AlignSize, Alignments } from '../components/alignSize'
import { Counter } from '../components/counter'
import { Limit } from '../components/limit'
import { ScrollSnap } from '../components/scrollSnap'

const viewSize = 100
const limit = Limit({ min: 0, max: 4 })
const index = Counter({ start: 0, limit, loop: false })

const scrollSnapParams = (
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

describe('ScrollSnap', () => {
  describe('Align Start', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = scrollSnapParams('start', false)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, -80, -104, -165, -220, -296])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = scrollSnapParams('start', true)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, -80, -104, -165, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = scrollSnapParams('start', true, snapSizes)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, 0, 0, 0, 0, 0])
    })
  })

  describe('Align Center', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = scrollSnapParams('center', false)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([10, -42, -84.5, -142.5, -208, -284])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = scrollSnapParams('center', true)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, -42, -84.5, -142.5, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = scrollSnapParams('center', true, snapSizes)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([20, 20, 20, 20, 20, 20])
    })
  })

  describe('Align End', () => {
    test('Calculates correct snap positions when contain is false', () => {
      const params = scrollSnapParams('end', false)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([20, -4, -65, -120, -196, -272])
    })
    test('Calculates correct snap positions when contain is true', () => {
      const params = scrollSnapParams('end', true)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([0, -4, -65, -120, -196, -196])
    })
    test('Calculates correct snap positions when contain is true and content does not fill up view', () => {
      const snapSizes = [10, 10, 10, 10, 10, 10]
      const params = scrollSnapParams('end', true, snapSizes)
      const scrollSnap = ScrollSnap(params)
      const snaps = params.snapSizes.map(scrollSnap.measure)
      expect(snaps).toEqual([40, 40, 40, 40, 40, 40])
    })
  })
})
