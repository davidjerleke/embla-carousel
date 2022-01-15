import { SlidesInView, SlidesInViewType } from '../components/SlidesInView'
import { ScrollLimit } from '../components/ScrollLimit'
import { arrayLast, mathAbs } from '../components/utils'

const viewSize = 100
const slideSizes = [30, 40, 25, 40, 60, 30, 50]
const snaps = [0, -30, -70, -95, -135, -195, -225]

const noThreshold = 0
const fullThreshold = 1

const locationMax = snaps[0]
const locationCenter = snaps[3]
const locationMin = snaps[6]

const getContentSize = (loop: boolean): number => {
  return loop
    ? arrayLast(snaps) - arrayLast(slideSizes)
    : arrayLast(snaps) + arrayLast(slideSizes)
}

const getSlidesInView = (
  loop: boolean,
  inViewThreshold: number,
): SlidesInViewType => {
  const contentSize = getContentSize(loop)
  const { limit } = ScrollLimit(contentSize, snaps, loop)

  return SlidesInView(
    viewSize,
    contentSize,
    slideSizes,
    snaps,
    limit,
    loop,
    inViewThreshold,
  )
}

describe('SlidesInView', () => {
  describe('Finds slides in view with NO THRESHOLD when', () => {
    describe('Loop is false, and location is', () => {
      const loop = false
      const contentSize = mathAbs(getContentSize(loop))
      const slidesInView = getSlidesInView(loop, noThreshold)

      test('Max', () => {
        const indexesInView = slidesInView.check(locationMax)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(locationCenter)
        expect(indexesInView).toEqual([3, 4])
      })

      test('Min', () => {
        const indexesInView = slidesInView.check(locationMin)
        expect(indexesInView).toEqual([6])
      })

      test('> Max', () => {
        const indexesInView = slidesInView.check(locationMax + contentSize)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('< Min', () => {
        const indexesInView = slidesInView.check(locationMin - contentSize)
        expect(indexesInView).toEqual([6])
      })
    })

    describe('Loop is true, and location is', () => {
      const loop = true
      const contentSize = mathAbs(getContentSize(loop))
      const slidesInView = getSlidesInView(loop, noThreshold)

      test('Max', () => {
        const indexesInView = slidesInView.check(locationMax)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(locationCenter)
        expect(indexesInView).toEqual([3, 4])
      })

      test('Min', () => {
        const indexesInView = slidesInView.check(locationMin)
        expect(indexesInView).toEqual([6, 0, 1])
      })

      test('> Max', () => {
        const indexesInView = slidesInView.check(locationMax + contentSize)
        expect(indexesInView).toEqual([0, 1, 2, 3])
      })

      test('< Min', () => {
        const indexesInView = slidesInView.check(locationMin - contentSize)
        expect(indexesInView).toEqual([6, 0, 1])
      })
    })
  })

  describe('Finds slides in view with FULL THRESHOLD when', () => {
    describe('Loop is false, and location is', () => {
      const loop = false
      const contentSize = mathAbs(getContentSize(loop))
      const slidesInView = getSlidesInView(loop, fullThreshold)

      test('Max', () => {
        const indexesInView = slidesInView.check(locationMax)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(locationCenter)
        expect(indexesInView).toEqual([3, 4])
      })

      test('Min', () => {
        const indexesInView = slidesInView.check(locationMin)
        expect(indexesInView).toEqual([6])
      })

      test('> Max', () => {
        const indexesInView = slidesInView.check(locationMax + contentSize)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('< Min', () => {
        const indexesInView = slidesInView.check(locationMin - contentSize)
        expect(indexesInView).toEqual([6])
      })
    })

    describe('Loop is true, and location is', () => {
      const loop = true
      const contentSize = mathAbs(getContentSize(loop))
      const slidesInView = getSlidesInView(loop, fullThreshold)

      test('Max', () => {
        const indexesInView = slidesInView.check(locationMax)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('Center', () => {
        const indexesInView = slidesInView.check(locationCenter)
        expect(indexesInView).toEqual([3, 4])
      })

      test('Min', () => {
        const indexesInView = slidesInView.check(locationMin)
        expect(indexesInView).toEqual([6, 0])
      })

      test('> Max', () => {
        const indexesInView = slidesInView.check(locationMax + contentSize)
        expect(indexesInView).toEqual([0, 1, 2])
      })

      test('< Min', () => {
        const indexesInView = slidesInView.check(locationMin - contentSize)
        expect(indexesInView).toEqual([6, 0])
      })
    })
  })
})
