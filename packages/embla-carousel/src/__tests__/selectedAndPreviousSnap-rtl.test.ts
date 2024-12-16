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
      emblaApi.reInit({ startSnap: firstIndex })
    })

    test('startSnap is NOT set', () => {
      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('startSnap is set', () => {
      emblaApi.reInit({ startSnap: 2 })

      expect(emblaApi.selectedSnap()).toBe(2)
      expect(emblaApi.previousSnap()).toBe(2)
    })

    test('User tries to scrollNext() past the last slide', () => {
      emblaApi.reInit({ startSnap: lastIndex })
      emblaApi.scrollNext()

      expect(emblaApi.selectedSnap()).toBe(lastIndex)
      expect(emblaApi.previousSnap()).toBe(lastIndex)
    })

    test('User tries to scrollPrev before the first slide', () => {
      emblaApi.scrollPrev()

      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index more than last index', () => {
      emblaApi.scrollToSnap(lastIndex + 1)

      expect(emblaApi.selectedSnap()).toBe(lastIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index less than first index', () => {
      emblaApi.scrollToSnap(firstIndex - 1)

      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('Stepping forward one snap at a time from the beginning', (done) => {
      let i = firstIndex

      while (i !== lastIndex) {
        emblaApi.scrollNext()
        expect(emblaApi.previousSnap()).toBe(i)
        i += 1
        expect(emblaApi.selectedSnap()).toBe(i)
      }
      done()
    })

    test('Stepping backward one snap at a time from the end', (done) => {
      emblaApi.reInit({ startSnap: lastIndex })
      let i = lastIndex

      while (i !== firstIndex) {
        emblaApi.scrollPrev()
        expect(emblaApi.previousSnap()).toBe(i)
        i -= 1
        expect(emblaApi.selectedSnap()).toBe(i)
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
      emblaApi.reInit({ startSnap: firstIndex })
    })

    test('startSnap is NOT set', () => {
      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('startSnap is set', () => {
      emblaApi.reInit({ startSnap: 2 })

      expect(emblaApi.selectedSnap()).toBe(2)
      expect(emblaApi.previousSnap()).toBe(2)
    })

    test('User tries to scrollNext() past the last slide', () => {
      emblaApi.reInit({ startSnap: lastIndex })
      emblaApi.scrollNext()

      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(lastIndex)
    })

    test('User tries to scrollPrev before the first slide', () => {
      emblaApi.scrollPrev()

      expect(emblaApi.selectedSnap()).toBe(lastIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index more than last index', () => {
      emblaApi.scrollToSnap(lastIndex + 1)

      expect(emblaApi.selectedSnap()).toBe(firstIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('User tries to scrollToSnap() an index less than first index', () => {
      emblaApi.scrollToSnap(firstIndex - 1)

      expect(emblaApi.selectedSnap()).toBe(lastIndex)
      expect(emblaApi.previousSnap()).toBe(firstIndex)
    })

    test('Stepping forward one snap at a time from the beginning', (done) => {
      let i = firstIndex

      while (i !== lastIndex) {
        emblaApi.scrollNext()
        expect(emblaApi.previousSnap()).toBe(i)
        i += 1
        expect(emblaApi.selectedSnap()).toBe(i)
      }
      done()
    })

    test('Stepping backward one snap at a time from the end', (done) => {
      emblaApi.reInit({ startSnap: lastIndex })
      let i = lastIndex

      while (i !== firstIndex) {
        emblaApi.scrollPrev()
        expect(emblaApi.previousSnap()).toBe(i)
        i -= 1
        expect(emblaApi.selectedSnap()).toBe(i)
      }
      done()
    })
  })
})
