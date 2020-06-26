import { Axis } from '../components/axis'
import { Alignment, AlignmentOption } from '../components/alignment'
import { PxToPercent } from '../components/pxToPercent'
import { SlideLooper } from '../components/slideLooper'
import { Vector1D } from '../components/vector1d'

const axis = Axis('x')
const pxToPercent = PxToPercent(950)
const viewSize = pxToPercent.totalPercent
const defaultSlideSizes = [15, 30, 15, 15, 70, 15, 15, 15]

const slideLooperParams = (
  align: AlignmentOption,
  slideSizes = defaultSlideSizes,
) => {
  const location = Vector1D(0)
  const alignment = Alignment({ align, viewSize })
  const scrollSnaps = slideSizes.map(alignment.measure)
  const contentSize = slideSizes.reduce((a, s) => a + s)
  return {
    axis,
    scrollSnaps,
    viewSize,
    contentSize,
    slideSizes,
    location,
  }
}

describe('SlideLooper', () => {
  describe('When align is Start', () => {
    const params = slideLooperParams('start')
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
        { index: 3, point: -150 },
        { index: 4, point: -165 },
      ])
    })

    test('Loop targets are calculated correctly', () => {
      const containerLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ getTarget }) => {
        return getTarget(containerLocation)
      })
      expect(loopTargets).toEqual([0, 0, 0, 0, 0])
    })
  })

  describe('When align is Center', () => {
    const params = slideLooperParams('center')
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
        { index: 1, point: -105 },
        { index: 2, point: -135 },
      ])
    })

    test('Loop targets are calculated correctly', () => {
      const containerLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ getTarget }) => {
        return getTarget(containerLocation)
      })
      expect(loopTargets).toEqual([-190, -190, -190, 0, 0, 0])
    })
  })

  describe('When align is End', () => {
    const params = slideLooperParams('end')
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 4, point: 45 },
        { index: 5, point: 30 },
        { index: 6, point: 15 },
        { index: 7, point: 0 },
        { index: 0, point: -90 },
      ])
    })

    test('Loop targets are calculated correctly', () => {
      const containerLocation = params.scrollSnaps[0]
      const loopTargets = loopPoints.map(({ getTarget }) => {
        return getTarget(containerLocation)
      })
      expect(loopTargets).toEqual([-190, -190, -190, -190, 0])
    })
  })

  describe('Determines when slide content is', () => {
    test('Enough to loop', () => {
      const slideSizes = [25, 43, 19, 31, 25]
      const params = slideLooperParams('center', slideSizes)
      const slideLooper = SlideLooper(params)
      expect(slideLooper.canLoop()).toEqual(true)
    })

    test('Not enough to loop', () => {
      const slideSizes = [25, 43, 18.99, 31, 25]
      const params = slideLooperParams('center', slideSizes)
      const slideLooper = SlideLooper(params)
      expect(slideLooper.canLoop()).toEqual(false)
    })
  })
})
