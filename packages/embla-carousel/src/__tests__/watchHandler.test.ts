import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_WATCH_HANDLER } from './fixtures/watchHandler.fixture'
import {
  MockMutationRecordType,
  triggerMutationObserver
} from './mocks/mutationObserver.mock'

describe('➡️  WatchHandler', () => {
  describe('Watchers added with onWatch():', () => {
    const mutationRecord: MockMutationRecordType[] = [{ type: 'childList' }]

    test('Calls the provided callback when its associated event is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const callback = jest.fn(() => true)

      emblaApi.onWatch('slidesChanged', callback)
      triggerMutationObserver(mutationRecord)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire a callback when a different watch is emitted', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const callback = jest.fn(() => true)

      emblaApi.onWatch('resize', callback)
      expect(callback).toHaveBeenCalledTimes(0)
    })

    test('Will NOT fire a callback anymore when it has been removed with offWatch()', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const callback = jest.fn()

      emblaApi.onWatch('slidesChanged', callback)
      triggerMutationObserver(mutationRecord)
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.offWatch('slidesChanged')
      triggerMutationObserver(mutationRecord)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('Will NOT fire any callback anymore when watch store is destroyed', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const callback = jest.fn()
      emblaApi.onWatch('slidesChanged', callback)
      triggerMutationObserver(mutationRecord)
      expect(callback).toHaveBeenCalledTimes(1)

      emblaApi.destroy()
      triggerMutationObserver(mutationRecord)
      expect(callback).toHaveBeenCalledTimes(1)
    })

    test('ALLOWS the default internal callback to run when the onWatch callback returns TRUE', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const eventCallback = jest.fn()

      emblaApi.on('slidesChanged', eventCallback)
      emblaApi.onWatch('slidesChanged', () => true)
      triggerMutationObserver(mutationRecord)

      expect(reInit).toHaveBeenCalledTimes(1)
      expect(eventCallback).toHaveBeenCalledTimes(1)
    })

    test('BLOCKS the default internal callback from running when the onWatch callback returns FALSE', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_WATCH_HANDLER))
      const reInit = jest.spyOn(emblaApi, 'reInit')
      const eventCallback = jest.fn()

      emblaApi.on('slidesChanged', eventCallback)
      emblaApi.onWatch('slidesChanged', () => false)
      triggerMutationObserver(mutationRecord)

      expect(reInit).toHaveBeenCalledTimes(0)
      expect(eventCallback).toHaveBeenCalledTimes(0)
    })
  })
})
