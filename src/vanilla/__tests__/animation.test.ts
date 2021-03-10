import { Animation, AnimationType } from '../components/animation'

let counter: number
let animation: AnimationType

const callback: FrameRequestCallback = (): void => {
  counter += 1
}

const mockRequestAnimationFrame = (callback: FrameRequestCallback): number => {
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
  describe('Runs callback when', () => {
    test('Start is invoked', () => {
      animation.start()
      expect(counter).toBe(1)
    })

    test('Proceeded is invoked after start', () => {
      animation.start()
      animation.proceed()
      expect(counter).toBe(2)
    })
  })

  describe('Does not run callback when', () => {
    test('Proceed is invoked directly', () => {
      animation.proceed()
      expect(counter).toBe(0)
    })

    test('Proceed is invoked after stop', () => {
      animation.start()
      animation.stop()
      animation.proceed()
      expect(counter).toBe(1)
    })

    test('Start is invoked twice in a row', () => {
      animation.start()
      animation.start()
      expect(counter).toBe(1)
    })
  })
})
