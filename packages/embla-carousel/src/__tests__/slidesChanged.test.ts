import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_SLIDES_CHANGED } from './fixtures/slidesChanged.fixture'
import {
  MockMutationRecordType,
  triggerMutationObserver
} from './mocks/mutationObserver.mock'

describe('➡️  SlidesChanged - MutationObserver', () => {
  describe('When DOM changes occur and the SLIDECHANGES option is set to TRUE', () => {
    const mutationRecord: MockMutationRecordType[] = [{ type: 'childList' }]

    test('The carousel WILL dispatch the slideschanged event and reinitialize', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: true
      })

      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('slideschanged', callback)
      triggerMutationObserver(mutationRecord)

      expect(callback).toHaveBeenCalledTimes(1)
      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('The carousel will NOT dispatch the slideschanged event or reinitialize when destroyed', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: true
      })

      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('slideschanged', callback)
      emblaApi.destroy()

      triggerMutationObserver(mutationRecord)

      expect(callback).toHaveBeenCalledTimes(0)
      expect(reInit).toHaveBeenCalledTimes(0)
    })

    test('A before callback that returns TRUE allows the internal default callback to run', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: true
      })

      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.on('slideschanged', () => true)
      triggerMutationObserver(mutationRecord)

      expect(reInit).toHaveBeenCalledTimes(1)
    })

    test('A before callback that returns FALSE blocks the internal default callback', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: true
      })

      const reInit = jest.spyOn(emblaApi, 'reInit')

      emblaApi.on('slideschanged', () => false)
      triggerMutationObserver(mutationRecord)

      expect(reInit).toHaveBeenCalledTimes(0)
    })
  })

  describe('When DOM changes occur and the SLIDECHANGES option is set to FALSE', () => {
    const mutationRecord: MockMutationRecordType[] = [{ type: 'childList' }]

    test('The slideschanged event is NOT dispatched and the carousel does NOT reinitialize', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: false
      })

      const reInit = jest.spyOn(emblaApi, 'reInit')
      const callback = jest.fn()

      emblaApi.on('slideschanged', callback)
      triggerMutationObserver(mutationRecord)

      expect(callback).toHaveBeenCalledTimes(0)
      expect(reInit).toHaveBeenCalledTimes(0)
    })

    test('A before callback does NOT run at all', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_SLIDES_CHANGED), {
        slideChanges: false
      })

      const callback = jest.fn(() => true)

      emblaApi.on('slideschanged', callback)
      triggerMutationObserver(mutationRecord)

      expect(callback).toHaveBeenCalledTimes(0)
    })
  })
})
