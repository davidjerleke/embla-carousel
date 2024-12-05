import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { triggerResizeObserver } from './mocks/resizeObserver.mock'
import { FIXTURE_RESIZE_RTL } from './fixtures/resize-rtl.fixture'

import {
  BELOW_RESIZE_TRIGGER_THRESHOLD,
  RESIZE_TRIGGER_THRESHOLD
} from './resize-ltr.test'

describe('➡️  Resize - Horizontal RTL', () => {
  describe('When a slide is resized and the RESIZE option is set to TRUE', () => {
    test('The carousel WILL dispatch the resize event and reinitialize when resize is ABOVE threshold', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: true,
        direction: 'rtl'
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
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: true,
        direction: 'rtl'
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
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: true,
        direction: 'rtl'
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

    test('An onWatch callback that returns TRUE allows the internal default callback to run', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: true,
        direction: 'rtl'
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.onWatch('resize', () => true)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('An onWatch callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: true,
        direction: 'rtl'
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.onWatch('resize', () => false)
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
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
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

    test('An onWatch callback does NOT run at all', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_RESIZE_RTL), {
        resize: false
      })

      const firstSlide = emblaApi.slideNodes()[0]
      const firstSlideWidth = emblaApi.internalEngine().slideRects[0].width
      const callback = jest.fn(() => true)

      emblaApi.onWatch('resize', callback)
      Object.defineProperty(firstSlide, 'offsetWidth', {
        value: firstSlideWidth + RESIZE_TRIGGER_THRESHOLD,
        configurable: true
      })
      triggerResizeObserver([{ target: firstSlide }])

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })
})
