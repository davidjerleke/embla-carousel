import EmblaCarousel, { EmblaCarouselType } from '../components/EmblaCarousel'
import { EmblaOptionsType } from '../components/Options'
import {
  runPendingAnimationFrames,
  mockTestElements,
  resetAnimationFrames
} from './mocks'
import {
  getLatestResizeObserver,
  triggerResizeObserver
} from './mocks/resizeObserver.mock'
import { FIXTURE_RESIZE_LTR } from './fixtures/resize-ltr.fixture'

const RESIZE_TRIGGER_THRESHOLD = 0.5
const BELOW_RESIZE_TRIGGER_THRESHOLD = 0.49

function createCarousel(options: EmblaOptionsType): EmblaCarouselType {
  const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), options)
  runPendingAnimationFrames()
  return emblaApi
}

describe('➡️  Resize - Horizontal LTR', () => {
  beforeEach(resetAnimationFrames)

  describe('When a slide is resized and the RESIZE option is set to TRUE', () => {
    test('The carousel WILL dispatch the resize event and reinitialize when resize is ABOVE threshold', () => {
      const emblaApi = createCarousel({
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
      runPendingAnimationFrames()

      expect(callback).toHaveBeenCalledTimes(1)
      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('The carousel will NOT dispatch the resize event or reinitialize when resize is BELOW threshold', () => {
      const emblaApi = createCarousel({
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
      const emblaApi = createCarousel({
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
      const emblaApi = createCarousel({
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
      runPendingAnimationFrames()

      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('A before callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = createCarousel({
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
      const emblaApi = createCarousel({
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
      const emblaApi = createCarousel({
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

  describe('When the carousel is initialized', () => {
    test('The container and slides are observed in an animation frame, not synchronously', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })
      const { observe } = getLatestResizeObserver()

      expect(observe).toHaveBeenCalledTimes(0)

      runPendingAnimationFrames()

      const observedNodes = observe.mock.calls.map(([node]) => node)
      expect(observedNodes).toEqual([
        emblaApi.containerNode(),
        ...emblaApi.slideNodes()
      ])
    })

    test('Nothing is observed if the carousel is destroyed before the animation frame runs', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_LTR), {
        resize: true
      })
      const { observe } = getLatestResizeObserver()

      emblaApi.destroy()
      runPendingAnimationFrames()

      expect(observe).toHaveBeenCalledTimes(0)
    })
  })

  describe('When multiple resize batches arrive before the deferred reinitialize runs', () => {
    test('The carousel only reinitializes once, deferred to an animation frame', () => {
      const emblaApi = createCarousel({
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])
      triggerResizeObserver([{ target: firstSlide }])
      triggerResizeObserver([{ target: firstSlide }])

      // reInit() must not run synchronously from inside the ResizeObserver
      // callback, and the batches above must schedule only one frame.
      expect(reInit).toHaveBeenCalledTimes(0)

      runPendingAnimationFrames()

      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('A pending reinitialize is cancelled if the carousel is destroyed first', () => {
      const emblaApi = createCarousel({
        resize: true
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame')
      cancelSpy.mockClear()

      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(cancelSpy).toHaveBeenCalledTimes(0)

      emblaApi.destroy()

      expect(cancelSpy).toHaveBeenCalledTimes(1)

      runPendingAnimationFrames()
      expect(reInit).toHaveBeenCalledTimes(0)

      cancelSpy.mockRestore()
    })
  })
})
