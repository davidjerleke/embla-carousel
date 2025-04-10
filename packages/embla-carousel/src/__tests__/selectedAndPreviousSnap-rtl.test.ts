import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_SELECTED_PREVIOUS_SNAP_RTL } from './fixtures/selectedAndPreviousSnap-rtl.fixture'

describe('➡️  SelectedScrollSnap & PreviousScrollSnap - Horizontal RTL', () => {
  describe('Is correct when LOOP:FALSE when:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SELECTED_PREVIOUS_SNAP_RTL),
      { direction: 'rtl' }
    )
    const lastIndex = FIXTURE_SELECTED_PREVIOUS_SNAP_RTL.slideOffsets.length - 1
    const firstIndex = 0

    beforeEach(() => {
      emblaApi.reInit({ startIndex: firstIndex })
    })

    test('startIndex is NOT set', () => {
      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('startIndex is set', () => {
      emblaApi.reInit({ startIndex: 2 })

      expect(emblaApi.selectedScrollSnap()).toBe(2)
      expect(emblaApi.previousScrollSnap()).toBe(2)
    })

    test('User tries to scrollNext() past the last slide', () => {
      emblaApi.reInit({ startIndex: lastIndex })
      emblaApi.scrollNext()

      expect(emblaApi.selectedScrollSnap()).toBe(lastIndex)
      expect(emblaApi.previousScrollSnap()).toBe(lastIndex)
    })

    test('User tries to scrollPrev before the first slide', () => {
      emblaApi.scrollPrev()

      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index more than last index', () => {
      emblaApi.scrollToSnap(lastIndex + 1)

      expect(emblaApi.selectedScrollSnap()).toBe(lastIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index less than first index', () => {
      emblaApi.scrollToSnap(firstIndex - 1)

      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('Stepping forward one snap at a time from the beginning', (done) => {
      let i = firstIndex

      while (i !== lastIndex) {
        emblaApi.scrollNext()
        expect(emblaApi.previousScrollSnap()).toBe(i)
        i += 1
        expect(emblaApi.selectedScrollSnap()).toBe(i)
      }
      done()
    })

    test('Stepping backward one snap at a time from the end', (done) => {
      emblaApi.reInit({ startIndex: lastIndex })
      let i = lastIndex

      while (i !== firstIndex) {
        emblaApi.scrollPrev()
        expect(emblaApi.previousScrollSnap()).toBe(i)
        i -= 1
        expect(emblaApi.selectedScrollSnap()).toBe(i)
      }
      done()
    })
  })

  describe('Is correct when LOOP:TRUE when:', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_SELECTED_PREVIOUS_SNAP_RTL),
      {
        direction: 'rtl',
        loop: true
      }
    )
    const lastIndex = FIXTURE_SELECTED_PREVIOUS_SNAP_RTL.slideOffsets.length - 1
    const firstIndex = 0

    beforeEach(() => {
      emblaApi.reInit({ startIndex: firstIndex })
    })

    test('startIndex is NOT set', () => {
      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('startIndex is set', () => {
      emblaApi.reInit({ startIndex: 2 })

      expect(emblaApi.selectedScrollSnap()).toBe(2)
      expect(emblaApi.previousScrollSnap()).toBe(2)
    })

    test('User tries to scrollNext() past the last slide', () => {
      emblaApi.reInit({ startIndex: lastIndex })
      emblaApi.scrollNext()

      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(lastIndex)
    })

    test('User tries to scrollPrev before the first slide', () => {
      emblaApi.scrollPrev()

      expect(emblaApi.selectedScrollSnap()).toBe(lastIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index more than last index', () => {
      emblaApi.scrollToSnap(lastIndex + 1)

      expect(emblaApi.selectedScrollSnap()).toBe(firstIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index less than first index', () => {
      emblaApi.scrollToSnap(firstIndex - 1)

      expect(emblaApi.selectedScrollSnap()).toBe(lastIndex)
      expect(emblaApi.previousScrollSnap()).toBe(firstIndex)
    })

    test('Stepping forward one snap at a time from the beginning', (done) => {
      let i = firstIndex

      while (i !== lastIndex) {
        emblaApi.scrollNext()
        expect(emblaApi.previousScrollSnap()).toBe(i)
        i += 1
        expect(emblaApi.selectedScrollSnap()).toBe(i)
      }
      done()
    })

    test('Stepping backward one snap at a time from the end', (done) => {
      emblaApi.reInit({ startIndex: lastIndex })
      let i = lastIndex

      while (i !== firstIndex) {
        emblaApi.scrollPrev()
        expect(emblaApi.previousScrollSnap()).toBe(i)
        i -= 1
        expect(emblaApi.selectedScrollSnap()).toBe(i)
      }
      done()
    })
  })
})
