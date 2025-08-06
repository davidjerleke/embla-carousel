import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_EVENTS } from './fixtures/eventHandler'

describe('➡️  EventHandler', () => {
  describe('Events added with on():', () => {
    test('Calls the provided event callback when its associated event is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollToNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.on('reinit', callback)
      emblaApi.reInit()
      expect(callback).toHaveBeenCalledTimes(2)
    })

    test('Calls all event callbacks associated with a specific event', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.scrollToNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })

    test('Allows callbacks to return boolean values for flow control', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn(() => true)
      const callback2 = jest.fn(() => false)
      const callback3 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.on('select', callback3)

      emblaApi.scrollToNext()

      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
      expect(callback3).toHaveBeenCalledTimes(0)
    })

    test('Calls the provided callback when emit() is triggered by the user', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      const event = emblaApi.createEvent('select', {
        targetSnap: 2,
        sourceSnap: 1
      })
      event.emit()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Returns true when all callbacks return true or undefined', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn(() => true)
      const callback2 = jest.fn() // returns undefined
      const callback3 = jest.fn(() => true)

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.on('select', callback3)

      const event = emblaApi.createEvent('select', {
        targetSnap: 2,
        sourceSnap: 1
      })

      const result = event.emit()
      expect(result).toBe(true)
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
      expect(callback3).toHaveBeenCalledTimes(1)
    })

    test('Returns false when any callback returns false', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn(() => true)
      const callback2 = jest.fn(() => false) // This should stop the chain
      const callback3 = jest.fn(() => true)

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.on('select', callback3)

      const event = emblaApi.createEvent('select', {
        targetSnap: 2,
        sourceSnap: 1
      })

      const result = event.emit()
      expect(result).toBe(false)
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
      expect(callback3).toHaveBeenCalledTimes(0) // Should not be called due to false return
    })

    test('Will NOT throw when emitting event with no registered callbacks ', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const event = emblaApi.createEvent('select', {
        targetSnap: 2,
        sourceSnap: 1
      })

      expect(() => {
        event.emit()
      }).not.toThrow()
    })

    test('Will NOT throw when off() is called on non-existent callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      expect(() => {
        emblaApi.off('select', callback)
      }).not.toThrow()
    })

    test('Will NOT have interfering callbacks for different events', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const selectCallback = jest.fn()
      const scrollCallback = jest.fn()

      emblaApi.on('select', selectCallback)
      emblaApi.on('scroll', scrollCallback)

      emblaApi.scrollToNext()

      expect(selectCallback).toHaveBeenCalled()
      expect(scrollCallback).not.toHaveBeenCalled()
    })

    test('Will NOT remove unrelated callbacks when off() is called', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn()
      const callback2 = jest.fn()

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.off('select', callback1)

      emblaApi.scrollToNext()

      expect(callback1).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire consecutive event callbacks when the first one returns false', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback1 = jest.fn(() => false)
      const callback2 = jest.fn(() => true)

      emblaApi.on('select', callback1)
      emblaApi.on('select', callback2)
      emblaApi.scrollToNext()
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(0)
    })

    test('Will NOT fire a callback when a different event is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('reinit', callback)
      emblaApi.scrollToNext()
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('Will NOT fire a callback anymore when it has been removed with off()', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const callback = jest.fn()

      emblaApi.on('select', callback)
      emblaApi.scrollToNext()
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.off('select', callback)
      emblaApi.scrollToNext()
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will emit events immediately BEFORE destroy ends', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_EVENTS))
      const selectEvent = emblaApi.createEvent('select', {
        targetSnap: 2,
        sourceSnap: 1
      })
      const scrollEvent = emblaApi.createEvent('scroll', {
        isDragging: true
      })

      emblaApi.destroy()

      const selectResult = selectEvent.emit()
      const scrollResult = scrollEvent.emit()

      expect(selectResult).toBe(true)
      expect(scrollResult).toBe(true)

      const selectEventAfterDestroy = emblaApi.createEvent('select', {
        targetSnap: 5,
        sourceSnap: 4
      })
      const scrollEventAfterDestroy = emblaApi.createEvent('scroll', {
        isDragging: false
      })

      const selectAfterResult = selectEventAfterDestroy.emit()
      const scrollAfterResult = scrollEventAfterDestroy.emit()

      expect(selectAfterResult).toBe(true)
      expect(scrollAfterResult).toBe(true)
    })
  })
})
