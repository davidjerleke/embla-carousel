import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_SCROLL_TO_SNAP_RTL } from './fixtures/scrollToSnap-rtl.fixture'

const SLIDE_TO_SNAP_INDEX_MAP: { [key: number]: number } = {
  0: 0,
  1: 0,
  2: 1,
  3: 1,
  4: 1,
  5: 1,
  6: 2,
  7: 2,
  8: 3,
  9: 3
}

describe('➡️  ScrollToSlide - Horizontal RTL', () => {
  describe('Starts scrolling to correct snap when jump parameter is FALSE and slidesToScroll is:', () => {
    test('Default (1), and slide index is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideIndex)
        expect(emblaApi.selectedScrollSnap()).toBe(slideIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[slideIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(slideIndex)
        slideIndex += 1
      }

      done()
    })

    test('Default (1), and slide element is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const slideNodes = emblaApi.slideNodes()
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideNodes[slideIndex])
        expect(emblaApi.selectedScrollSnap()).toBe(slideIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[slideIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(slideIndex)
        slideIndex += 1
      }

      done()
    })

    test('"auto" and slide index is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideIndex)
        const snapIndex = SLIDE_TO_SNAP_INDEX_MAP[slideIndex]
        expect(emblaApi.selectedScrollSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(snapIndex)
        slideIndex += 1
      }

      done()
    })

    test('"auto" and slide element is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const slideNodes = emblaApi.slideNodes()
      const animationStart = jest.spyOn(
        emblaApi.internalEngine().animation,
        'start'
      )

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideNodes[slideIndex])
        const snapIndex = SLIDE_TO_SNAP_INDEX_MAP[slideIndex]
        expect(emblaApi.selectedScrollSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(animationStart).toHaveBeenCalledTimes(snapIndex)
        slideIndex += 1
      }

      done()
    })
  })

  describe('Instantly scrolls to correct snap when jump parameter is TRUE and slidesToScroll is:', () => {
    test('Default (1), and slide index is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const container = emblaApi.containerNode()

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideIndex, true)
        expect(emblaApi.selectedScrollSnap()).toBe(slideIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[slideIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[slideIndex] * -1}px,0px,0px)`
        )
        slideIndex += 1
      }

      done()
    })

    test('Default (1), and slide element is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const slideNodes = emblaApi.slideNodes()
      const container = emblaApi.containerNode()

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideNodes[slideIndex], true)
        expect(emblaApi.selectedScrollSnap()).toBe(slideIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[slideIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[slideIndex] * -1}px,0px,0px)`
        )
        slideIndex += 1
      }

      done()
    })

    test('"auto" and slide index is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const container = emblaApi.containerNode()

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideIndex, true)
        const snapIndex = SLIDE_TO_SNAP_INDEX_MAP[slideIndex]
        expect(emblaApi.selectedScrollSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[snapIndex] * -1}px,0px,0px)`
        )
        slideIndex += 1
      }

      done()
    })

    test('"auto" and slide element is provided', (done) => {
      const emblaApi = EmblaCarousel(
        mockTestElements(FIXTURE_SCROLL_TO_SNAP_RTL),
        { direction: 'rtl', slidesToScroll: 'auto' }
      )
      const { scrollSnaps } = emblaApi.internalEngine()
      const firstIndex = 0
      const lastIndex = emblaApi.slideNodes().length - 1
      const slideNodes = emblaApi.slideNodes()
      const container = emblaApi.containerNode()

      let slideIndex = firstIndex

      while (slideIndex !== lastIndex) {
        emblaApi.scrollToSlide(slideNodes[slideIndex], true)
        const snapIndex = SLIDE_TO_SNAP_INDEX_MAP[slideIndex]
        expect(emblaApi.selectedScrollSnap()).toBe(snapIndex)
        expect(emblaApi.internalEngine().target.get()).toBe(
          scrollSnaps[snapIndex]
        )
        expect(container.style.transform).toBe(
          `translate3d(${scrollSnaps[snapIndex] * -1}px,0px,0px)`
        )
        slideIndex += 1
      }

      done()
    })
  })
})
