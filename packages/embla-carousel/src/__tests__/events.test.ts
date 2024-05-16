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
})
