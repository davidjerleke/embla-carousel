import { ScrollBody } from '../components/scrollBody'
import { Vector1D } from '../components/vector1d'

let location: Vector1D
let target: Vector1D
let scrollBody: ScrollBody

beforeEach(() => {
  location = Vector1D(0)
  target = Vector1D(10)
  scrollBody = ScrollBody({
    location,
    speed: 10,
    mass: 1,
  })
})

describe('ScrollBody', () => {
  describe('Seek', () => {
    test('Seeks given target Vector', () => {
      scrollBody.seek(target).update()
      expect(location.get()).toBeGreaterThan(0)
    })

    test('Has direction value of 1 when it seeks given positive target Vector', () => {
      scrollBody.seek(target).update()
      expect(scrollBody.direction.get()).toBe(1)
    })

    test('Has direction value of -1 when it seeks given negative target Vector', () => {
      target.set(-10)
      scrollBody.seek(target).update()
      expect(scrollBody.direction.get()).toBe(-1)
    })
  })

  describe('Settle', () => {
    test('Is true when diff to given target Vector is <= 0.001', () => {
      location.set(9.999)
      expect(scrollBody.settle(target)).toBe(true)
    })

    test('Is false when diff to given target Vector is > 0.001', () => {
      location.set(9.99)
      expect(scrollBody.settle(target)).toBe(false)
    })
  })
})
