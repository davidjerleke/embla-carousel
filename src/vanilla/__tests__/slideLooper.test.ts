import { Axis } from '../components/axis'
import { Alignment, AlignmentOption } from '../components/alignment'
import { PxToPercent } from '../components/pxToPercent'
import { ScrollSnap } from '../components/scrollSnap'
import { SlideLooper } from '../components/slideLooper'
import { SlidesInView } from '../components/slidesInView'
import { Vector1D } from '../components/vector1d'
import { arrayKeys } from '../components/utils'

const axis = Axis('x')
const pxToPercent = PxToPercent(950)
const viewSize = pxToPercent.totalPercent
const defaultSlideSizes = [20, 30, 30, 35, 50, 20, 40]

const slideLooperParams = (
  align: AlignmentOption,
  location: Vector1D,
  slideSizes = defaultSlideSizes,
) => {
  const alignment = Alignment({ align, viewSize })
  const scrollSnap = ScrollSnap({
    alignment,
    loop: true,
    snapSizes: slideSizes,
  })
  const scrollSnaps = arrayKeys(slideSizes).map(scrollSnap.measure)
  const contentSize = slideSizes.reduce((a, s) => a + s)
  const slidesInView = SlidesInView({
    contentSize,
    viewSize,
    loop: true,
    inViewThreshold: 1,
    slideSizes,
  })
  return {
    axis,
    scrollSnaps,
    viewSize,
    contentSize,
    slideSizes,
    slidesInView,
    location,
  }
}

describe('SlideLooper', () => {
  describe('When align is Start', () => {
    const location = Vector1D(0)
    const params = slideLooperParams('start', location)
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 0, point: -125 },
        { index: 1, point: -145 },
        { index: 2, point: -175 },
        { index: 3, point: -205 },
      ])
    })

    test('End gap is covered with slides', () => {
      location.set(params.scrollSnaps[0])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([0, 0, 0, 0])
    })

    test('Start gap is covered with slides', () => {
      location.set(params.scrollSnaps[params.scrollSnaps.length - 1])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([225, 225, 225, 0])
    })
  })

  describe('When align is Center', () => {
    const location = Vector1D(0)
    const params = slideLooperParams('center', location)
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 6, point: 0 },
        { index: 0, point: -125 },
        { index: 1, point: -145 },
        { index: 2, point: -175 },
      ])
    })

    test('End gap is covered with slides', () => {
      location.set(params.scrollSnaps[0])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([-225, 0, 0, 0])
    })

    test('Start gap is covered with slides', () => {
      location.set(params.scrollSnaps[params.scrollSnaps.length - 1])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([0, 225, 225, 0])
    })
  })

  describe('When align is End', () => {
    const location = Vector1D(0)
    const params = slideLooperParams('end', location)
    const { loopPoints } = SlideLooper(params)

    test('Loop points are calculated correctly', () => {
      expect(loopPoints).toMatchObject([
        { index: 6, point: 0 },
        { index: 5, point: 40 },
        { index: 4, point: 60 },
        { index: 0, point: -125 },
      ])
    })

    test('End gap is covered with slides', () => {
      location.set(params.scrollSnaps[0])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([-225, -225, -225, 0])
    })

    test('Start gap is covered with slides', () => {
      location.set(params.scrollSnaps[params.scrollSnaps.length - 1])
      const loopTargets = loopPoints.map(({ getTarget }) => getTarget())
      expect(loopTargets).toEqual([0, 0, 0, 225])
    })
  })

  describe('Determines when slide content is', () => {
    const location = Vector1D(0)

    test('Enough to loop', () => {
      const slideSizes = [25, 43, 19, 31, 25]
      const params = slideLooperParams('center', location, slideSizes)
      const slideLooper = SlideLooper(params)
      expect(slideLooper.canLoop()).toEqual(true)
    })

    test('Not enough to loop', () => {
      const slideSizes = [25, 43, 18.99, 31, 25]
      const params = slideLooperParams('center', location, slideSizes)
      const slideLooper = SlideLooper(params)
      expect(slideLooper.canLoop()).toEqual(false)
    })
  })
})
