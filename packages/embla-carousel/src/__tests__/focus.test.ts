import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_FOCUS } from './fixtures/focus.fixture'

describe('➡️  Focus', () => {
  describe('When a slide receives focus and the FOCUS option is set to TRUE', () => {
    test('The slideFocus event is dispatched and the carousel instantly scrolls the scroll snap into view', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const container = emblaApi.containerNode()
      const callback = jest.fn()

      emblaApi.on('slidefocus', callback)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(callback).toHaveBeenCalledTimes(1)
      expect(container.style.transform).toBe('translate3d(-1200px,0px,0px)')
    })

    test('The carousel does NOT scroll the scroll snap into view if the focus was NOT triggered by TAB', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      document.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowRight' })
      )
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.internalEngine().location.get()).toBe(0)
      expect(emblaApi.internalEngine().target.get()).toBe(0)
      expect(emblaApi.selectedScrollSnap()).toBe(0)
    })

    test('The carousel will NOT fire any callback or scroll to snap anymore when destroyed', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const callback = jest.fn()
      const fifthSlide = emblaApi.slideNodes()[4]

      emblaApi.on('slidefocus', callback)
      emblaApi.destroy()

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.internalEngine().location.get()).toBe(0)
      expect(emblaApi.internalEngine().target.get()).toBe(0)
      expect(emblaApi.selectedScrollSnap()).toBe(0)
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('An onWatch callback that returns TRUE allows the internal default callback to run', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      emblaApi.onWatch('slidefocus', () => true)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.selectedScrollSnap()).toBe(4)
    })

    test('An onWatch callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      emblaApi.onWatch('slidefocus', () => false)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.selectedScrollSnap()).toBe(0)
    })
  })

  describe('When a slide receives focus and the FOCUS option is set to FALSE', () => {
    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
      focus: false
    })

    test('The slideFocus event is NOT dispatched', () => {
      const firstSlide = emblaApi.slideNodes()[0]
      const callback = jest.fn()

      emblaApi.on('slidefocus', callback)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      firstSlide.dispatchEvent(new FocusEvent('focus'))

      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('The carousel does NOT scroll the scroll snap into view', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: false
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.internalEngine().target.get()).toBe(0)
      expect(emblaApi.selectedScrollSnap()).toBe(0)
    })

    test('An onWatch callback does NOT run at all', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: false
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const callback = jest.fn(() => true)

      emblaApi.onWatch('slidefocus', callback)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })
})
