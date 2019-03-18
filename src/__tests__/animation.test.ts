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
  describe('Run Callback', () => {
    test('Runs callback when Animation is started', () => {
      animation.start()
      expect(counter).toBe(1)
    })
    test('Runs callback when Animation is proceeded', () => {
      animation.start()
      animation.proceed()
      expect(counter).toBe(2)
    })
  })

  describe('Do not run Callback', () => {
    test('Does not run callback when Animation proceed is invoked after stop', () => {
      animation.start()
      animation.stop()
      animation.proceed()
      expect(counter).toBe(1)
    })
    test('Does not run callback when Animation start is invoked a second time', () => {
      animation.start()
      animation.start()
      expect(counter).toBe(1)
    })
  })
})
