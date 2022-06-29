import { EventHandler, EventHandlerType } from '../components/EventHandler'

let callback1: () => void
let callback2: () => void
let eventEmitter: EventHandlerType

describe('EventHandler', () => {
  beforeEach(() => {
    callback1 = jest.fn()
    callback2 = jest.fn()
    eventEmitter = EventHandler().on('init', callback1).on('init', callback2)
  })

  describe('Runs all callbacks when they are', () => {
    test('Added to store and the same event type is emitted', () => {
      eventEmitter.emit('init')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })
  })

  describe('Does not run any callback when they are', () => {
    test('Removed from store and the same event type is emitted', () => {
      eventEmitter.off('init', callback1)
      eventEmitter.off('init', callback2)
      eventEmitter.emit('init')
      expect(callback1).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(0)
    })

    test('Added to store and a different event type is emitted', () => {
      eventEmitter.emit('select')
      expect(callback1).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(0)
    })
  })
})
