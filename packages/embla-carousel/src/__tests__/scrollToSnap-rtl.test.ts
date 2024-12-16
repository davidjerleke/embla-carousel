import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_SCROLL_TO_SNAP_RTL } from './fixtures/scrollToSnap-rtl.fixture'

describe('➡️  ScrollToSnap - Horizontal RTL', () => {
  describe('Starts scrolling to correct snap when jump parameter is FALSE and slidesToScroll is:', () => {
    test('Default (1)', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.snapList().length - 1
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let snapIndex = firstIndex

      while (snapIndex !== lastIndex) {
        emblaApi.scrollToSnap(snapIndex)
        expect(emblaApi.selectedSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(snapIndex)
        snapIndex += 1
      }

      done()
    })

    test('"auto"', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.snapList().length - 1
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let snapIndex = firstIndex

      while (snapIndex !== lastIndex) {
        emblaApi.scrollToSnap(snapIndex)
        expect(emblaApi.selectedSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(snapIndex)
        snapIndex += 1
      }

      done()
    })
  })

  describe('Instantly scrolls to correct snap when jump parameter is TRUE and slidesToScroll is:', () => {
    test('Default (1)', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.snapList().length - 1
      const container = emblaApi.containerNode()

      let snapIndex = firstIndex

      while (snapIndex !== lastIndex) {
        emblaApi.scrollToSnap(snapIndex, true)
        expect(emblaApi.selectedSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[snapIndex] * -1}px,0px,0px)`
        )
        snapIndex += 1
      }

      done()
    })

    test('"auto"', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.snapList().length - 1
      const container = emblaApi.containerNode()

      let snapIndex = firstIndex

      while (snapIndex !== lastIndex) {
        emblaApi.scrollToSnap(snapIndex, true)
        expect(emblaApi.selectedSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[snapIndex] * -1}px,0px,0px)`
        )
        snapIndex += 1
      }

      done()
    })
  })
})
