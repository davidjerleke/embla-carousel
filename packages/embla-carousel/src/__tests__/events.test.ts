import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_EVENTS } from './fixtures/events.fixture'

describe('➡️  Events', () => {
  const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))

  describe('Events added with on():', () => {
    test('Calls the provided callback when its associated event are emitted', () => {
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.on('reInit', callback)
      emblaApi.reInit()
      expect(callback).toHaveBeenCalledTimes(2)
    })

    test('Calls all callbacks associated with a specific event', () => {
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.scrollNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })

    test('Calls the provided callback when emit() is triggered by the user', () => {
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.emit('select')
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire a callback when a different event is emitted', () => {
      const callback = jest.fn()

      emblaApi.on('reInit', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('Will NOT fire a callback anymore when it has been removed with off()', () => {
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.off('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire any callback anymore when event store is destroyed', () => {
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.on('scroll', callback)
      emblaApi.destroy()
      emblaApi.emit('select')
      emblaApi.emit('scroll')
      expect(callback).toHaveBeenCalledTimes(0)
    })
  })

  describe('Events with AbortController signal:', () => {
    test('Calls the provided callback when signal is not aborted', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)
      testApi.destroy()
    })

    test('Does NOT call the callback when signal is aborted before event emission', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      abortController.abort()
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(0)
      testApi.destroy()
    })

    test('Does NOT call the callback when signal is aborted after event listener is added', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      abortController.abort()
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)
      testApi.destroy()
    })

    test('Multiple callbacks with different signals work independently', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()
      const abortController1 = new AbortController()
      const abortController2 = new AbortController()

      testApi.on('select', callback1, { signal: abortController1.signal })
      testApi.on('select', callback2, { signal: abortController2.signal })

      testApi.scrollNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)

      abortController1.abort()
      testApi.scrollNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(2)
      testApi.destroy()
    })

    test('Callback can still be removed with off() even when using signal', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      testApi.off('select', callback)
      testApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)
      testApi.destroy()
    })

    test('Works with user-triggered emit() when signal is not aborted', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      testApi.emit('select')
      expect(callback).toHaveBeenCalledTimes(1)
      testApi.destroy()
    })

    test('Does NOT work with user-triggered emit() when signal is aborted', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      abortController.abort()
      testApi.emit('select')
      expect(callback).toHaveBeenCalledTimes(0)
      testApi.destroy()
    })

    test('Automatically removes listener from memory when signal is aborted', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback1, { signal: abortController.signal })
      testApi.on('select', callback2)

      testApi.emit('select')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)

      abortController.abort()

      testApi.emit('select')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(2)

      testApi.off('select', callback1)
      testApi.emit('select')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(3)
      testApi.destroy()
    })

    test('Does not interfere with manually removing aborted listener via off()', () => {
      const testApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()
      const abortController = new AbortController()

      testApi.on('select', callback, { signal: abortController.signal })
      abortController.abort()

      testApi.off('select', callback)
      testApi.emit('select')
      expect(callback).toHaveBeenCalledTimes(0)
      testApi.destroy()
    })
  })
})
