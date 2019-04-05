import { EventDispatcher } from '../components/eventDispatcher'

let eventDispatcher: EventDispatcher
let callback: () => void

beforeEach(() => {
  eventDispatcher = EventDispatcher()
  callback = jest.fn()
})

describe('EventDispatcher', () => {
  test('Subscribing callback fires when event is dispatched', () => {
    eventDispatcher.on('init', callback)
    eventDispatcher.dispatch('init')
    expect(callback).toHaveBeenCalledTimes(1)
  })
  test('Removed callback does not fire when event is dispatched', () => {
    eventDispatcher.on('init', callback)
    eventDispatcher.off('init', callback)
    eventDispatcher.dispatch('init')
    expect(callback).toHaveBeenCalledTimes(0)
  })
  test('Subscribing callback does not fire when an unrelated event is dispatched', () => {
    eventDispatcher.on('init', callback)
    eventDispatcher.dispatch('select')
    expect(callback).toHaveBeenCalledTimes(0)
  })
  test('All subscribing callbacks fire when event is dispatched', () => {
    const callback2 = jest.fn()
    eventDispatcher.on('init', callback)
    eventDispatcher.on('init', callback2)
    eventDispatcher.dispatch('init')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})
