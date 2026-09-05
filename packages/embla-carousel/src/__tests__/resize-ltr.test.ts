import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { triggerResizeObserver } from './mocks/resizeObserver.mock'
import { FIXTURE_RESIZE_LTR } from './fixtures/resize-ltr.fixture'

const RESIZE_TRIGGER_THRESHOLD = 0.5
const BELOW_RESIZE_TRIGGER_THRESHOLD = 0.49

describe('➡️  Resize - Horizontal LTR', () => {
  describe('When a slide is resized and the RESIZE option is set to TRUE', () => {
    test('The carousel WILL dispatch the resize event and reinitialize when resize is ABOVE threshold', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('resize', callback)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(1)
      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('The carousel will NOT dispatch the resize event or reinitialize when resize is BELOW threshold', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('resize', callback)
      emblaApi.destroy()

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + BELOW_RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(0)
      expect(reInit).toHaveBeenCalledTimes(0)
    })

    test('The carousel will NOT dispatch the resize event or reinitialize when destroyed', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('resize', callback)
      emblaApi.destroy()

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(0)
      expect(reInit).toHaveBeenCalledTimes(0)
    })

    test('A before callback that returns TRUE allows the internal default callback to run', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.on('resize', () => true)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('A before callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.on('resize', () => false)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(reInit).toHaveBeenCalledTimes(0)
    })
  })

  describe('When a slide is resized and the RESIZE option is set to FALSE', () => {
    test('The resize event is NOT dispatched and the carousel does NOT reinitialize', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: false
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('resize', callback)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(0)
      expect(reInit).toHaveBeenCalledTimes(0)
    })

    test('A before callback does NOT run at all', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: false
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const callback = jest.fn(() => true)

      emblaApi.on('resize', callback)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })

  describe('When multiple resize batches arrive before the deferred reinitialize runs', () => {
    // window.requestAnimationFrame is already a jest.fn() (see
    // mocks/requestAnimationFrame.mock.ts) that invokes its callback
    // synchronously. mockImplementationOnce overrides it for exactly the one
    // call under test and then automatically falls back to that default
    // synchronous behavior, so nothing needs to be restored afterwards - and
    // unrelated requestAnimationFrame calls elsewhere in the engine are
    // unaffected.
    function captureNextAnimationFrame(): { frame?: FrameRequestCallback } {
      const captured: { frame?: FrameRequestCallback } = {}
      ;(window.requestAnimationFrame as jest.Mock).mockImplementationOnce(
        (callback: FrameRequestCallback) => {
          captured.frame = callback
          return 1
        }
      )
      return captured
    }

    test('The carousel only reinitializes once, deferred to an animation frame', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const captured = captureNextAnimationFrame()

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])
      triggerResizeObserver([{ target: firstSlide }])
      triggerResizeObserver([{ target: firstSlide }])

      // reInit() must not run synchronously from inside the ResizeObserver
      // callback, and the three batches above must schedule only one frame
      // (the mocked call above was only consumed once).
      expect(reInit).toHaveBeenCalledTimes(0)

      captured.frame?.(1)

      // The three batches above must still only reinitialize once.
      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('A pending reinitialize is cancelled if the carousel is destroyed first', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const captured = captureNextAnimationFrame()
      const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame')

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(cancelSpy).toHaveBeenCalledTimes(0)

      emblaApi.destroy()

      expect(cancelSpy).toHaveBeenCalledTimes(1)

      // Even if the frame still fires after destroy, reInit() must not run.
      captured.frame?.(1)
      expect(reInit).toHaveBeenCalledTimes(0)

      cancelSpy.mockRestore()
    })
  })
})
