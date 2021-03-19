import { SlidesInView, SlidesInViewType } from '../components/slidesInView'
import { arrayKeys } from '../components/utils'
import {
  Alignment,
  AlignmentOptionType,
  AlignmentType,
} from '../components/alignment'

const viewSize = 100
const slideSizes = [30, 40, 25, 40, 60, 30, 50]
const firstSlide = slideSizes[0]
const contentSize = slideSizes.reduce((a, s) => a + s, 0)
const snaps = arrayKeys(slideSizes).map((index) => {
  return slideSizes.slice(0, index).reduce((total, size) => total - size, 0)
})

const noThreshold = 0
const fullThreshold = 1

const getAlignment = (align: AlignmentOptionType): AlignmentType =>
  Alignment(align, viewSize)

const getSlidesInView = (
  loop: boolean,
  inViewThreshold: number,
): SlidesInViewType => {
  return SlidesInView(
    viewSize,
    contentSize,
    slideSizes,
    snaps,
    loop,
    inViewThreshold,
  )
}

describe('SlidesInView', () => {
  const startAlign = getAlignment('start').measure(firstSlide)
  const centerAlign = getAlignment('center').measure(firstSlide)
  const endAlign = getAlignment('end').measure(firstSlide)

  describe('Finds slides in view with NO THRESHOLD when', () => {
    describe('Loop is false, and align is', () => {
      const slidesInView = getSlidesInView(false, noThreshold)

      test('Start', () => {
        const indexesInView = slidesInView.check(startAlign)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(centerAlign)
        expect(indexesInView).toEqual([0, 1])
      })

      test('End', () => {
        const indexesInView = slidesInView.check(endAlign)
        expect(indexesInView).toEqual([0])
      })
    })

    describe('Loop is true, and align is', () => {
      const slidesInView = getSlidesInView(true, noThreshold)

      test('Start', () => {
        const indexesInView = slidesInView.check(startAlign)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(centerAlign)
        expect(indexesInView).toEqual([0, 1, 6])
      })

      test('End', () => {
        const indexesInView = slidesInView.check(endAlign)
        expect(indexesInView).toEqual([0, 5, 6])
      })
    })
  })

  describe('Finds slides in view with FULL THRESHOLD when', () => {
    describe('Loop is false, and align is', () => {
      const slidesInView = getSlidesInView(false, fullThreshold)

      test('Start', () => {
        const indexesInView = slidesInView.check(startAlign)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(centerAlign)
        expect(indexesInView).toEqual([0])
      })

      test('End', () => {
        const indexesInView = slidesInView.check(endAlign)
        expect(indexesInView).toEqual([0])
      })
    })

    describe('Loop is true, and align is', () => {
      const slidesInView = getSlidesInView(true, fullThreshold)

      test('Start', () => {
        const indexesInView = slidesInView.check(startAlign)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(centerAlign)
        expect(indexesInView).toEqual([0])
      })

      test('End', () => {
        const indexesInView = slidesInView.check(endAlign)
        expect(indexesInView).toEqual([0, 6])
      })
    })
  })
})
