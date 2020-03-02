import { ScrollBody } from '../components/scrollBody'
import { Vector1D } from '../components/vector1d'

let scrollBody: ScrollBody
let target: Vector1D

beforeEach(() => {
  scrollBody = ScrollBody({
    location: Vector1D(0),
    speed: 10,
    mass: 1,
  })
  target = Vector1D(10)
})

describe('ScrollBody', () => {
  describe('Seek', () => {
    test('Seeks given target Vector', () => {
      scrollBody.seek(target).update()
      expect(scrollBody.location.get()).toBeGreaterThan(0)
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
    test('Settle is true when diff to given target Vector is <= 0.001', () => {
      scrollBody.location.set(9.999)
      expect(scrollBody.settle(target)).toBe(true)
    })
    test('Settle is false when diff to given target Vector is > 0.001', () => {
      scrollBody.location.set(9.99)
      expect(scrollBody.settle(target)).toBe(false)
    })
  })
})
