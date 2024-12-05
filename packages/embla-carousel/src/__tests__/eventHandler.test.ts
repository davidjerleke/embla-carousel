import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_EVENTS } from './fixtures/eventHandler'

describe('➡️  EventHandler', () => {
  describe('Events added with on():', () => {
    test('Calls the provided callback when its associated event is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.on('reInit', callback)
      emblaApi.reInit()
      expect(callback).toHaveBeenCalledTimes(2)
    })

    test('Calls all callbacks associated with a specific event', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.scrollNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })

    test('Calls the provided callback when emit() is triggered by the user', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.emit('select', null)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire a callback when a different event is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('reInit', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('Will NOT fire a callback anymore when it has been removed with off()', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.off('select', callback)
      emblaApi.scrollNext()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire any callback anymore when event store is destroyed', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('scroll', callback2)
      emblaApi.emit('select', null)
      emblaApi.emit('scroll', null)
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)

      emblaApi.destroy()
      emblaApi.emit('select', null)
      emblaApi.emit('scroll', null)
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })
  })
})
