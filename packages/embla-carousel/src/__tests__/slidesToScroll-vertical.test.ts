import EmblaCarousel from '../components/EmblaCarousel'
import { defaultOptions } from '../components/Options'
import { mockTestElements } from './mocks'
import {
  FIXTURE_SLIDES_TO_SCROLL_Y_1,
  FIXTURE_SLIDES_TO_SCROLL_Y_2,
  FIXTURE_SLIDES_TO_SCROLL_Y_3
} from './fixtures/slidesToScroll-vertical.fixture'

const FIRST_SNAP_INDEX = 0

describe('➡️  SlidesToScroll - Vertical', () => {
  describe('"auto" is correct for slides WITHOUT MARGINS and:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SLIDES_TO_SCROLL_Y_1)
    )

    beforeEach(() => {
      emblaApi.reInit({ ...defaultOptions, slidesToScroll: 'auto', axis: 'y' })
    })

    test('LOOP:FALSE', () => {
      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -1000, -2000, -3001]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:FALSE and CONTAINSCROLL:FALSE', () => {
      emblaApi.reInit({ containScroll: false })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -1000, -2000, -3000.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:TRUE', () => {
      emblaApi.reInit({ loop: true })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -1000, -2000, -3000.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })
  })

  describe('"auto" is correct for slides WITH MARGINS and:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SLIDES_TO_SCROLL_Y_2)
    )

    beforeEach(() => {
      emblaApi.reInit({ ...defaultOptions, slidesToScroll: 'auto', axis: 'y' })
    })

    test('LOOP:FALSE', () => {
      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -1020, -2030, -3041]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:FALSE and CONTAINSCROLL:FALSE', () => {
      emblaApi.reInit({ containScroll: false })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-10, -1020, -2030, -3030.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:TRUE', () => {
      emblaApi.reInit({ loop: true })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-10, -1020, -2030, -3030.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3, 4, 5],
        [6, 7],
        [8, 9]
      ])
    })
  })

  describe('"auto" is correct for edge cases when slide width is greater than viewport and:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SLIDES_TO_SCROLL_Y_3)
    )

    beforeEach(() => {
      emblaApi.reInit({
        ...defaultOptions,
        slidesToScroll: 'auto',
        axis: 'y'
      })
    })

    test('LOOP:FALSE', () => {
      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -247, -475, -703, -931, -1178]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0], [1], [2], [3], [4], [5]])
    })

    test('LOOP:FALSE and CONTAINSCROLL:FALSE', () => {
      emblaApi.reInit({ containScroll: false })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-19, -247, -475, -703, -931, -1159]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0], [1], [2], [3], [4], [5]])
    })

    test('LOOP:TRUE', () => {
      emblaApi.reInit({ loop: true })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-19, -247, -475, -703, -931, -1159]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0], [1], [2], [3], [4], [5]])
    })
  })

  describe('"Custom number 2" is correct for slides WITHOUT MARGINS and:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SLIDES_TO_SCROLL_Y_1)
    )

    beforeEach(() => {
      emblaApi.reInit({ ...defaultOptions, slidesToScroll: 2, axis: 'y' })
    })

    test('LOOP:FALSE', () => {
      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -750, -1250, -2000, -3001]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:FALSE and CONTAINSCROLL:FALSE', () => {
      emblaApi.reInit({ containScroll: false })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -750, -1250, -2000, -3000.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:TRUE', () => {
      emblaApi.reInit({ loop: true })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -750, -1250, -2000, -3000.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })
  })

  describe('"Custom number 2" is correct for slides WITH MARGINS and:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SLIDES_TO_SCROLL_Y_2)
    )

    beforeEach(() => {
      emblaApi.reInit({ ...defaultOptions, slidesToScroll: 2, axis: 'y' })
    })

    test('LOOP:FALSE', () => {
      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -765, -1275, -2030, -3041]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:FALSE and CONTAINSCROLL:FALSE', () => {
      emblaApi.reInit({ containScroll: false })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-10, -765, -1275, -2030, -3030.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })

    test('LOOP:TRUE', () => {
      emblaApi.reInit({ loop: true })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [-10, -765, -1275, -2030, -3030.5]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [8, 9]
      ])
    })
  })
})
