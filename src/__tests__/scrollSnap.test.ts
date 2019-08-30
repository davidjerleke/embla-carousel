import { AlignSize, Alignments } from '../components/alignSize'
import { ScrollSnap } from '../components/scrollSnap'

const scrollSnapParams = (align: Alignments) => ({
  alignSize: AlignSize({ align, viewSize: 100 }),
  loop: false,
  snapSizes: [80, 24, 61, 55, 76, 15],
})

describe('ScrollSnap', () => {
  test('Calculates correct snaps when align is start', () => {
    const params = scrollSnapParams('start')
    const scrollSnap = ScrollSnap(params)
    const snaps = params.snapSizes.map(scrollSnap.measure)
    expect(snaps).toEqual([0, -80, -104, -165, -220, -296])
  })

  test('Calculates correct snaps when align is center', () => {
    const params = scrollSnapParams('center')
    const scrollSnap = ScrollSnap(params)
    const snaps = params.snapSizes.map(scrollSnap.measure)
    expect(snaps).toEqual([10, -42, -84.5, -142.5, -208, -253.5])
  })

  test('Calculates correct snaps when align is end', () => {
    const params = scrollSnapParams('end')
    const scrollSnap = ScrollSnap(params)
    const snaps = params.snapSizes.map(scrollSnap.measure)
    expect(snaps).toEqual([20, -4, -65, -120, -196, -211])
  })
})
