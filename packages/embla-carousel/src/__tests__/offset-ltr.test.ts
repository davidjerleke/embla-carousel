import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import {
  FIXTURE_ALIGN_LTR_1,
  FIXTURE_ALIGN_LTR_2
} from './fixtures/align-ltr.fixture'

const FIRST_SNAP_INDEX = 0

describe('➡️  Offset - Horizontal LTR', () => {
  describe('Offset 0 produces identical snaps to no offset for slides WITHOUT MARGINS:', () => {
    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false,
      offset: 0
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: 0 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [0, -800, -1200, -1400, -1900]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: 0 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [100, -500, -800, -1150, -1550]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: 0 })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [200, -200, -400, -900, -1200]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Positive offset shifts snaps for slides WITHOUT MARGINS and ALIGN is:', () => {
    const OFFSET = 50

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false,
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0 + OFFSET,
        -800 + OFFSET,
        -1200 + OFFSET,
        -1400 + OFFSET,
        -1900 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        100 + OFFSET,
        -500 + OFFSET,
        -800 + OFFSET,
        -1150 + OFFSET,
        -1550 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        200 + OFFSET,
        -200 + OFFSET,
        -400 + OFFSET,
        -900 + OFFSET,
        -1200 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({
        align: (viewSize) => viewSize * 0.1,
        offset: OFFSET
      })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        100 + OFFSET,
        -700 + OFFSET,
        -1100 + OFFSET,
        -1300 + OFFSET,
        -1800 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Negative offset shifts snaps for slides WITHOUT MARGINS and ALIGN is:', () => {
    const OFFSET = -30

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false,
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        0 + OFFSET,
        -800 + OFFSET,
        -1200 + OFFSET,
        -1400 + OFFSET,
        -1900 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        100 + OFFSET,
        -500 + OFFSET,
        -800 + OFFSET,
        -1150 + OFFSET,
        -1550 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        200 + OFFSET,
        -200 + OFFSET,
        -400 + OFFSET,
        -900 + OFFSET,
        -1200 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({
        align: (viewSize) => viewSize * 0.1,
        offset: OFFSET
      })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        100 + OFFSET,
        -700 + OFFSET,
        -1100 + OFFSET,
        -1300 + OFFSET,
        -1800 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Positive offset shifts snaps for slides WITH MARGINS and ALIGN is:', () => {
    const OFFSET = 50

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_2), {
      containScroll: false,
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        -10 + OFFSET,
        -830 + OFFSET,
        -1250 + OFFSET,
        -1470 + OFFSET,
        -1990 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        90 + OFFSET,
        -530 + OFFSET,
        -850 + OFFSET,
        -1220 + OFFSET,
        -1640 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        190 + OFFSET,
        -230 + OFFSET,
        -450 + OFFSET,
        -970 + OFFSET,
        -1290 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({
        align: (viewSize) => viewSize * 0.1,
        offset: OFFSET
      })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        90 + OFFSET,
        -730 + OFFSET,
        -1150 + OFFSET,
        -1370 + OFFSET,
        -1890 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Negative offset shifts snaps for slides WITH MARGINS and ALIGN is:', () => {
    const OFFSET = -30

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_2), {
      containScroll: false,
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        -10 + OFFSET,
        -830 + OFFSET,
        -1250 + OFFSET,
        -1470 + OFFSET,
        -1990 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        90 + OFFSET,
        -530 + OFFSET,
        -850 + OFFSET,
        -1220 + OFFSET,
        -1640 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        190 + OFFSET,
        -230 + OFFSET,
        -450 + OFFSET,
        -970 + OFFSET,
        -1290 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Custom', () => {
      emblaApi.reInit({
        align: (viewSize) => viewSize * 0.1,
        offset: OFFSET
      })

      const engine = emblaApi.internalEngine()
      const expectedScrollSnaps = [
        90 + OFFSET,
        -730 + OFFSET,
        -1150 + OFFSET,
        -1370 + OFFSET,
        -1890 + OFFSET
      ]

      expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
      expect(engine.location.get()).toBe(expectedScrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Offset does not change the number of snaps or selected index:', () => {
    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false
    })

    test('Snap count is the same with and without offset', () => {
      emblaApi.reInit({ align: 'start', offset: 0 })
      const snapsWithoutOffset = emblaApi.internalEngine().scrollSnaps.length

      emblaApi.reInit({ align: 'start', offset: 100 })
      const snapsWithOffset = emblaApi.internalEngine().scrollSnaps.length

      expect(snapsWithOffset).toBe(snapsWithoutOffset)
    })

    test('Selected snap index is 0 at start with offset', () => {
      emblaApi.reInit({ align: 'start', offset: 100 })
      expect(emblaApi.selectedSnap()).toBe(0)
    })

    test('Selected snap index is 0 at start with negative offset', () => {
      emblaApi.reInit({ align: 'start', offset: -100 })
      expect(emblaApi.selectedSnap()).toBe(0)
    })
  })

  describe('Offset works with containScroll trimSnaps:', () => {
    const OFFSET = 50

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: 'trimSnaps',
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Offset works with containScroll keepSnaps:', () => {
    const OFFSET = 50

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: 'keepSnaps',
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBeGreaterThan(0)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Offset works with loop:', () => {
    const OFFSET = 50

    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false,
      loop: true,
      offset: OFFSET
    })

    test('Start', () => {
      emblaApi.reInit({ align: 'start', offset: OFFSET, loop: true })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBe(5)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('Center', () => {
      emblaApi.reInit({ align: 'center', offset: OFFSET, loop: true })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBe(5)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })

    test('End', () => {
      emblaApi.reInit({ align: 'end', offset: OFFSET, loop: true })

      const engine = emblaApi.internalEngine()

      expect(engine.scrollSnaps.length).toBe(5)
      expect(engine.location.get()).toBe(engine.scrollSnaps[FIRST_SNAP_INDEX])
    })
  })

  describe('Offset preserves uniform spacing between snaps:', () => {
    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_ALIGN_LTR_1), {
      containScroll: false
    })

    test('Gaps between snaps are the same with and without offset', () => {
      emblaApi.reInit({ align: 'start', offset: 0 })
      const snapsWithout = emblaApi.internalEngine().scrollSnaps
      const gapsWithout = snapsWithout
        .slice(1)
        .map((snap, i) => snap - snapsWithout[i])

      emblaApi.reInit({ align: 'start', offset: 75 })
      const snapsWith = emblaApi.internalEngine().scrollSnaps
      const gapsWith = snapsWith
        .slice(1)
        .map((snap, i) => snap - snapsWith[i])

      expect(gapsWith).toEqual(gapsWithout)
    })

    test('Gaps between snaps are the same with negative offset', () => {
      emblaApi.reInit({ align: 'center', offset: 0 })
      const snapsWithout = emblaApi.internalEngine().scrollSnaps
      const gapsWithout = snapsWithout
        .slice(1)
        .map((snap, i) => snap - snapsWithout[i])

      emblaApi.reInit({ align: 'center', offset: -40 })
      const snapsWith = emblaApi.internalEngine().scrollSnaps
      const gapsWith = snapsWith
        .slice(1)
        .map((snap, i) => snap - snapsWith[i])

      expect(gapsWith).toEqual(gapsWithout)
    })
  })
})
