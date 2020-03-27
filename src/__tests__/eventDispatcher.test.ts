import { EventDispatcher } from '../components/eventDispatcher'

let callback1: () => void
let callback2: () => void
let eventDispatcher: EventDispatcher

beforeEach(() => {
  callback1 = jest.fn()
  callback2 = jest.fn()
  eventDispatcher = EventDispatcher()
  eventDispatcher.on('init', callback1)
  eventDispatcher.on('init', callback2)
})

describe('EventDispatcher', () => {
  describe('Runs callbacks when they are', () => {
    test('Added and the related event is dispatched', () => {
      eventDispatcher.dispatch('init')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)
    })
  })

  describe('Does not run callbacks when they are', () => {
    test('Removed and related event is dispatched', () => {
      eventDispatcher.off('init', callback1)
      eventDispatcher.off('init', callback2)
      eventDispatcher.dispatch('init')
      expect(callback1).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(0)
    })

    test('Added and an unrelated event is dispatched', () => {
      eventDispatcher.dispatch('select')
      expect(callback1).toHaveBeenCalledTimes(0)
      expect(callback2).toHaveBeenCalledTimes(0)
    })
  })
})
