import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import {
  FIXTURE_CONTAIN_SCROLL_RTL_1,
  FIXTURE_CONTAIN_SCROLL_RTL_2,
  FIXTURE_CONTAIN_SCROLL_RTL_3,
  FIXTURE_CONTAIN_SCROLL_RTL_4,
  FIXTURE_CONTAIN_SCROLL_RTL_5,
  FIXTURE_CONTAIN_SCROLL_RTL_6,
  FIXTURE_CONTAIN_SCROLL_RTL_7
} from './fixtures/containScroll-rtl.fixture'

const FIRST_SNAP_INDEX = 0

describe('➡️  ContainScroll - Horizontal RTL', () => {
  describe('"trimSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_1),
      { containScroll: 'trimSnaps', direction: 'rtl' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -100, -300, -450, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4, 5, 6, 7, 8, 9]
      ])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -75, -265, -380, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1, 2],
        [3],
        [4],
        [5],
        [6],
        [7, 8, 9]
      ])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1, 2, 3, 4, 5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: (viewSize) => viewSize * 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -200, -350, -600, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5, 6, 7, 8, 9]
      ])
    })
  })

  describe('"trimSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_2),
      { containScroll: 'trimSnaps', direction: 'rtl' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -350, -520, -790, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5, 6, 7, 8, 9]
      ])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -145, -355, -490, -660, -855, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1, 2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8, 9]
      ])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1, 2, 3, 4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: (viewSize) => viewSize * 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -30, -250, -420, -690, -840, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6, 7, 8, 9]
      ])
    })
  })

  describe('"trimSnaps" is correct for edge cases when:', () => {
    test('Content size is 2 pixels wider than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_3),
        { direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0, 1]])
    })

    test('Content size is 3 pixels wider than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_4),
        { direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -3]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0], [1]])
    })

    test('Content size is less than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_5),
        { direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0, 1]])
    })

    test('Snaps at the START diff less than 1 pixel', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_6),
        { direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -129.5, -258.5, -387.5, -516.5, -646]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0, 1, 2],
        [3],
        [4],
        [5],
        [6],
        [7, 8, 9]
      ])
    })

    test('Snaps at the END diff less than 1 pixel', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_7),
        { direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -215.5, -430.5, -646]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0, 1], [2], [3], [4, 5]])
    })
  })

  describe('"keepSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_1),
      { containScroll: 'keepSnaps', direction: 'rtl' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -100, -300, -450, -660, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -75, -265, -380, -530, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, 0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: (viewSize) => viewSize * 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, -200, -350, -600, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })
  })

  describe('"keepSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_2),
      { containScroll: 'keepSnaps', direction: 'rtl' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -130, -350, -520, -790, -860, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -145, -355, -490, -660, -855, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: (viewSize) => viewSize * 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -30, -250, -420, -690, -840, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9]
      ])
    })
  })

  describe('"keepSnaps" is correct for edge cases when content size is:', () => {
    test('2 pixels wider than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_3),
        { containScroll: 'keepSnaps', direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0, 1]])
    })

    test('3 pixels wider than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_4),
        { containScroll: 'keepSnaps', direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -3]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0], [1]])
    })

    test('Less than viewport', () => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_CONTAIN_SCROLL_RTL_5),
        { containScroll: 'keepSnaps', direction: 'rtl' }
      )

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])

      expect(engine.slideRegistry).toEqual([[0, 1]])
    })
  })
})
