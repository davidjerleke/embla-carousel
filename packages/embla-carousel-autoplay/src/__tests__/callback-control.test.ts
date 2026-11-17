import EmblaCarousel from 'embla-carousel'
import { mockTestElements } from '../../../embla-carousel/src/__tests__/mocks'
import Autoplay from '../components/Autoplay'

function setup(stopOnLastSnap = false) {
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
  const autoplay = Autoplay({ delay: 100, instant: true, stopOnLastSnap })
  const api = EmblaCarousel(
    root,
    { loop: !stopOnLastSnap, resize: false, slideChanges: false },
    [autoplay]
  )
  expect(api.snapList()).toHaveLength(3)
  return { api, autoplay, root }
}

describe('Autoplay callback control', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test.each(['select', 'autoplay:select', 'autoplay:play'] as const)(
    'stop from %s owns the pending continuation',
    (eventName) => {
      const { api, autoplay } = setup()
      const select = jest.fn()
      api.on('select', select)
      api.on(eventName, () => autoplay.stop())
      autoplay.play()
      jest.advanceTimersByTime(500)
      expect(autoplay.isPlaying()).toBe(false)
      expect(autoplay.timeUntilNext()).toBeNull()
      expect(select).toHaveBeenCalledTimes(
        eventName === 'autoplay:play' ? 0 : 1
      )
      api.destroy()
    }
  )

  test.each(['select', 'autoplay:select', 'autoplay:play'] as const)(
    'pause from %s survives until an explicit resume',
    (eventName) => {
      const { api, autoplay } = setup()
      const callback = () => autoplay.pause()
      api.on(eventName, callback)
      autoplay.play()
      jest.advanceTimersByTime(100)
      const selected = api.selectedSnap()
      expect(autoplay.isPlaying()).toBe(false)
      expect(autoplay.timeUntilNext()).toBeNull()
      jest.advanceTimersByTime(400)
      expect(api.selectedSnap()).toBe(selected)
      api.off(eventName, callback)
      autoplay.play()
      jest.advanceTimersByTime(100)
      expect(api.selectedSnap()).not.toBe(selected)
      api.destroy()
    }
  )

  test.each([
    'select',
    'autoplay:select',
    'autoplay:play',
    'autoplay:stop'
  ] as const)('a nested play from %s owns exactly one timer', (eventName) => {
    const { api, autoplay } = setup()
    let nested = false
    api.on(eventName, () => {
      if (nested) return
      nested = true
      autoplay.stop()
      autoplay.play()
    })
    const timerSet = jest.fn()
    api.on('autoplay:timerset', timerSet)
    autoplay.play()
    if (eventName === 'autoplay:stop') autoplay.stop()
    else if (eventName !== 'autoplay:play') jest.advanceTimersByTime(100)
    expect(nested).toBe(true)
    expect(autoplay.isPlaying()).toBe(true)
    expect(autoplay.timeUntilNext()).toBe(100)
    expect(timerSet).toHaveBeenCalledTimes(
      eventName === 'autoplay:play' ? 1 : 2
    )
    const select = jest.fn()
    api.on('select', select)
    jest.advanceTimersByTime(100)
    expect(select).toHaveBeenCalledTimes(1)
    api.destroy()
  })

  test.each(['select', 'autoplay:select'] as const)(
    'a nested pause and play from %s consumes the remaining delay',
    (eventName) => {
      const { api, autoplay } = setup()
      let nested = false
      api.on(eventName, () => {
        if (nested) return
        nested = true
        autoplay.pause()
        autoplay.play()
      })
      autoplay.play()
      jest.advanceTimersByTime(100)
      expect(autoplay.isPlaying()).toBe(true)
      expect(autoplay.timeUntilNext()).toBe(100)
      api.destroy()
    }
  )

  test.each(['select', 'autoplay:select', 'autoplay:play'] as const)(
    'destroy from %s cancels playback',
    (eventName) => {
      const { api, autoplay } = setup()
      api.on(eventName, () => api.destroy())
      autoplay.play()
      jest.advanceTimersByTime(500)
      expect(autoplay.isPlaying()).toBe(false)
      expect(autoplay.timeUntilNext()).toBeNull()
    }
  )

  test.each(['select', 'autoplay:select', 'autoplay:play'] as const)(
    'reinit from %s leaves the new lifecycle stopped',
    (eventName) => {
      const { api, autoplay } = setup()
      let reinitialized = false
      api.on(eventName, () => {
        if (reinitialized) return
        reinitialized = true
        api.reInit()
      })
      autoplay.play()
      jest.advanceTimersByTime(500)
      expect(reinitialized).toBe(true)
      expect(autoplay.isPlaying()).toBe(false)
      expect(autoplay.timeUntilNext()).toBeNull()
      api.destroy()
    }
  )

  test('timer events can stop and reset playback without a stale timer', () => {
    const { api, autoplay } = setup()
    let reset = false
    api.on('autoplay:timerset', () => {
      if (reset) return
      reset = true
      autoplay.reset()
    })
    autoplay.play()
    expect(autoplay.timeUntilNext()).toBe(100)
    const select = jest.fn()
    api.on('select', select)
    jest.advanceTimersByTime(100)
    expect(select).toHaveBeenCalledTimes(1)
    api.on('autoplay:timerset', () => autoplay.stop())
    autoplay.reset()
    jest.advanceTimersByTime(500)
    expect(select).toHaveBeenCalledTimes(1)
    expect(autoplay.timeUntilNext()).toBeNull()
    api.destroy()
  })

  test('destroy cannot be restarted by a stop listener', () => {
    const { api, autoplay } = setup()
    autoplay.play()
    api.on('autoplay:stop', () => autoplay.play())
    api.destroy()
    expect(autoplay.isPlaying()).toBe(false)
    expect(autoplay.timeUntilNext()).toBeNull()
  })

  test('pause inside reset retains the callback delay on resume', () => {
    const { api, autoplay } = setup()
    autoplay.play()
    jest.advanceTimersByTime(40)
    autoplay.pause()
    autoplay.play()
    jest.advanceTimersByTime(20)
    const pause = () => {
      jest.advanceTimersByTime(10)
      autoplay.pause()
    }
    api.on('autoplay:timerset', pause)
    autoplay.reset()
    api.off('autoplay:timerset', pause)
    autoplay.play()
    expect(autoplay.timeUntilNext()).toBe(90)
    api.destroy()
  })

  test('timerstopped can start a new playback operation', () => {
    const { api, autoplay } = setup()
    autoplay.play()
    const replay = () => autoplay.play()
    api.on('autoplay:timerstopped', replay)
    autoplay.stop()
    expect(autoplay.isPlaying()).toBe(true)
    expect(autoplay.timeUntilNext()).toBe(100)
    api.off('autoplay:timerstopped', replay)
    api.destroy()
  })

  test('play, pause, resume, reset and stop retain their normal timing', () => {
    const { api, autoplay } = setup()
    const states: boolean[] = []
    api.on('autoplay:play', () => {
      states.push(autoplay.isPlaying())
    })
    api.on('autoplay:stop', () => {
      states.push(autoplay.isPlaying())
    })
    autoplay.play()
    jest.advanceTimersByTime(40)
    autoplay.pause()
    expect(autoplay.timeUntilNext()).toBeNull()
    jest.advanceTimersByTime(200)
    autoplay.play()
    expect(autoplay.timeUntilNext()).toBe(60)
    jest.advanceTimersByTime(59)
    expect(api.selectedSnap()).toBe(0)
    jest.advanceTimersByTime(1)
    expect(api.selectedSnap()).toBe(1)
    jest.advanceTimersByTime(20)
    autoplay.reset()
    expect(autoplay.timeUntilNext()).toBe(100)
    autoplay.stop()
    autoplay.stop()
    jest.advanceTimersByTime(500)
    expect(api.selectedSnap()).toBe(1)
    expect(states).toEqual([true, false, true, false])
    api.destroy()
  })

  test('stopOnLastSnap stops after reaching the final snap', () => {
    const { api, autoplay } = setup(true)
    autoplay.play()
    jest.advanceTimersByTime(500)
    expect(api.selectedSnap()).toBe(2)
    expect(autoplay.isPlaying()).toBe(false)
    expect(autoplay.timeUntilNext()).toBeNull()
    api.destroy()
  })

  test('a new play at the final snap owns playback', () => {
    const { api, autoplay } = setup(true)
    api.on('autoplay:select', () => {
      if (api.selectedSnap() === 2) {
        autoplay.stop()
        autoplay.play()
      }
    })
    autoplay.play()
    jest.advanceTimersByTime(200)
    expect(autoplay.isPlaying()).toBe(true)
    expect(autoplay.timeUntilNext()).toBe(100)
    api.destroy()
  })

  test('document visibility and the default interaction still stop playback', () => {
    const { api, autoplay } = setup()
    autoplay.play()
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden'
    })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(autoplay.isPlaying()).toBe(false)
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible'
    })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(autoplay.isPlaying()).toBe(true)
    api
      .createEvent('pointerdown', {
        originalEvent: new MouseEvent('mousedown')
      } as never)
      .emit()
    expect(autoplay.isPlaying()).toBe(false)
    api.destroy()
  })
})
