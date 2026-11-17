import EmblaCarousel from 'embla-carousel'
import { mockTestElements } from '../../../embla-carousel/src/__tests__/mocks'
import Autoplay from '../components/Autoplay'

test('a deferred play from stop clears the old timer before becoming visible', () => {
  jest.useFakeTimers()
  const root = mockTestElements({
    containerOffset: {
      offsetWidth: 200,
      offsetHeight: 50,
      offsetLeft: 0,
      offsetTop: 0
    },
    slideOffsets: [0, 200, 400].map((offsetLeft) => ({
      offsetWidth: 200,
      offsetHeight: 50,
      offsetLeft,
      offsetTop: 0
    })),
    endMargin: { property: 'marginRight', value: 0 }
  })
  const autoplay = Autoplay({ delay: 100, instant: true })
  const api = EmblaCarousel(root, { loop: true }, [autoplay])
  const replay = () => autoplay.play()
  api.on('autoplay:stop', replay)
  autoplay.play()
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: 'hidden'
  })
  autoplay.stop()
  jest.advanceTimersByTime(500)
  expect(api.selectedSnap()).toBe(0)
  expect(autoplay.isPlaying()).toBe(false)
  expect(autoplay.timeUntilNext()).toBeNull()
  expect(jest.getTimerCount()).toBe(0)
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    value: 'visible'
  })
  document.dispatchEvent(new Event('visibilitychange'))
  expect(autoplay.isPlaying()).toBe(true)
  jest.advanceTimersByTime(100)
  expect(api.selectedSnap()).toBe(1)
  api.off('autoplay:stop', replay)
  api.destroy()
  jest.useRealTimers()
})
