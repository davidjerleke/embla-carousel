import { Animation } from '../components/animation'

let counter: number
let animation: Animation

const callback: FrameRequestCallback = (): void => {
  counter += 1
}

const mockRequestAnimationFrame = (callback: Function): number => {
  callback(1)
  return 1
}

beforeEach(() => {
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(mockRequestAnimationFrame)
  animation = Animation(callback)
  counter = 0
})

describe('Animation', () => {
  describe('Runs callback', () => {
    test('When animation start is invoked', () => {
      animation.start()
      expect(counter).toBe(1)
    })

    test('When animation proceeded is invoked after start', () => {
      animation.start()
      animation.proceed()
      expect(counter).toBe(2)
    })
  })

  describe('Does not run callback', () => {
    test('When animation proceed is invoked directly', () => {
      animation.proceed()
      expect(counter).toBe(0)
    })

    test('When animation proceed is invoked after stop', () => {
      animation.start()
      animation.stop()
      animation.proceed()
      expect(counter).toBe(1)
    })

    test('When animation start is invoked a second time', () => {
      animation.start()
      animation.start()
      expect(counter).toBe(1)
    })
  })
})
