import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_FOCUS } from './fixtures/focus.fixture'
import { FIXTURE_AXIS_Y } from './fixtures/axis-vertical.fixture'

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
      expect(emblaApi.selectedSnap()).toBe(0)
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
      expect(emblaApi.selectedSnap()).toBe(0)
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('An event callback that returns TRUE allows the internal default callback to run', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      emblaApi.on('slidefocus', () => true)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.selectedSnap()).toBe(4)
    })

    test('An event callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true
      })

      const fifthSlide = emblaApi.slideNodes()[4]

      emblaApi.on('slidefocus', () => false)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(emblaApi.selectedSnap()).toBe(0)
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
      expect(emblaApi.selectedSnap()).toBe(0)
    })

    test('An event callback does NOT run at all', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: false
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const callback = jest.fn(() => true)

      emblaApi.on('slidefocus', callback)
      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })
})

describe('➡️  Focus - ScrollLeft/ScrollTop Properties', () => {
  describe('When axis is set to x (horizontal)', () => {
    test('The rootNode scrollLeft property is set to 0 when focus event happens', async () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: true,
        axis: 'x'
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const rootNode = emblaApi.rootNode()

      Object.defineProperty(rootNode, 'scrollLeft', {
        value: 100,
        writable: true,
        configurable: true
      })

      expect(rootNode.scrollLeft).toBe(100)

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      await new Promise((resolve) => process.nextTick(resolve))

      expect(rootNode.scrollLeft).toBe(0)
    })

    test('The rootNode scrollLeft property is NOT set when focus option is disabled', async () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_FOCUS), {
        focus: false,
        axis: 'x'
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const rootNode = emblaApi.rootNode()

      Object.defineProperty(rootNode, 'scrollLeft', {
        value: 100,
        writable: true,
        configurable: true
      })

      expect(rootNode.scrollLeft).toBe(100)

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      await new Promise((resolve) => process.nextTick(resolve))

      expect(rootNode.scrollLeft).toBe(100)
    })
  })

  describe('When axis is set to y (vertical)', () => {
    test('The rootNode scrollTop property is set to 0 when focus option is enabled and axis is y', async () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_Y), {
        focus: true,
        axis: 'y'
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const rootNode = emblaApi.rootNode()

      Object.defineProperty(rootNode, 'scrollTop', {
        value: 100,
        writable: true,
        configurable: true
      })

      expect(rootNode.scrollTop).toBe(100)

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      await new Promise((resolve) => process.nextTick(resolve))

      expect(rootNode.scrollTop).toBe(0)
    })

    test('The rootNode scrollTop property is NOT set when focus option is disabled', async () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_Y), {
        focus: false,
        axis: 'y'
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const rootNode = emblaApi.rootNode()

      Object.defineProperty(rootNode, 'scrollTop', {
        value: 100,
        writable: true,
        configurable: true
      })

      expect(rootNode.scrollTop).toBe(100)

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      await new Promise((resolve) => process.nextTick(resolve))

      expect(rootNode.scrollTop).toBe(100)
    })

    test('The rootNode scrollLeft property is NOT affected when axis is y', async () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_Y), {
        focus: true,
        axis: 'y'
      })

      const fifthSlide = emblaApi.slideNodes()[4]
      const rootNode = emblaApi.rootNode()

      Object.defineProperty(rootNode, 'scrollLeft', {
        value: 100,
        writable: true,
        configurable: true
      })

      expect(rootNode.scrollLeft).toBe(100)

      document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }))
      fifthSlide.dispatchEvent(new FocusEvent('focus'))

      await new Promise((resolve) => process.nextTick(resolve))

      expect(rootNode.scrollLeft).toBe(100)
    })
  })
})
