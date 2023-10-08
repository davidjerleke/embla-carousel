import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import {
  FIXTURE_CONTAIN_SCROLL_LTR_1,
  FIXTURE_CONTAIN_SCROLL_LTR_2,
  FIXTURE_CONTAIN_SCROLL_RTL_1,
  FIXTURE_CONTAIN_SCROLL_RTL_2,
  FIXTURE_CONTAIN_SCROLL_Y_1,
  FIXTURE_CONTAIN_SCROLL_Y_2
} from './fixtures/containScroll.fixture'

const FIRST_SNAP_INDEX = 0

describe('➡️  ContainScroll - Horizontal LTR', () => {
  describe('"trimSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_LTR_1),
      { containScroll: 'trimSnaps' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -100, -300, -450, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -75, -265, -380, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -200, -350, -600, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"trimSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_LTR_2),
      { containScroll: 'trimSnaps' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -350, -520, -790, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -145, -355, -490, -660, -855, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -30, -250, -420, -690, -840, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"keepSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_LTR_1),
      { containScroll: 'keepSnaps' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -100, -300, -450, -660, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -75, -265, -380, -530, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, 0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, -200, -350, -600, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"keepSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_LTR_2),
      { containScroll: 'keepSnaps' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -130, -350, -520, -790, -860, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -145, -355, -490, -660, -855, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -30, -250, -420, -690, -840, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })
})

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
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -75, -265, -380, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -200, -350, -600, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
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
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -145, -355, -490, -660, -855, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -30, -250, -420, -690, -840, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
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
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -75, -265, -380, -530, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, 0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, -200, -350, -600, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
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
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -145, -355, -490, -660, -855, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -30, -250, -420, -690, -840, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })
})

describe('➡️  ContainScroll - Vertical', () => {
  describe('"trimSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_Y_1),
      { containScroll: 'trimSnaps', axis: 'y' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -100, -300, -450, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -75, -265, -380, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -200, -350, -600, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"trimSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_Y_2),
      { containScroll: 'trimSnaps', axis: 'y' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -130, -350, -520, -790, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -145, -355, -490, -660, -855, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"keepSnaps" is correct for slides WITHOUT MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_Y_1),
      { containScroll: 'keepSnaps', axis: 'y' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -100, -300, -450, -660, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -75, -265, -380, -530, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, 0, -130, -280, -530, -660]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, -200, -350, -600, -660, -660, -660, -660, -660
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('"keepSnaps" is correct for slides WITH MARGINS and ALIGN is:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONTAIN_SCROLL_Y_2),
      { containScroll: 'keepSnaps', axis: 'y' }
    )

    test('Start', () => {
      emblaApi.reInit({ align: 'start' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -130, -350, -520, -790, -860, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, 0, 0, -145, -355, -490, -660, -855, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end' })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, 0, 0, 0, 0, -40, -260, -430, -700, -860]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({ align: 0.1 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0, -30, -250, -420, -690, -840, -860, -860, -860, -860
      ]
      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })
})
