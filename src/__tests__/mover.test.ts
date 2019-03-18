import { Mover } from '../components/mover'
import { Vector1D } from '../components/vector1d'

let mover: Mover
let target: Vector1D

beforeEach(() => {
  mover = Mover({
    location: Vector1D(0),
    speed: 10,
    mass: 2,
    maxForce: 100,
  })
  target = Vector1D(10)
})

describe('Mover', () => {
  describe('Seek', () => {
    test('Seeks given target Vector', () => {
      mover.seek(target).update()
      expect(mover.location.get()).toBeGreaterThan(0)
    })
    test('Has direction value of 1 when it seeks given positive target Vector', () => {
      mover.seek(target).update()
      expect(mover.direction.get()).toBe(1)
    })
    test('Has direction value of -1 when it seeks given negative target Vector', () => {
      target.setNumber(-10)
      mover.seek(target).update()
      expect(mover.direction.get()).toBe(-1)
    })
  })

  describe('Settle', () => {
    test('Settle is true when diff to given target Vector is <= 0.001', () => {
      mover.location.setNumber(9.999)
      expect(mover.settle(target)).toBe(true)
    })
    test('Settle is false when diff to given target Vector is > 0.001', () => {
      mover.location.setNumber(9.99)
      expect(mover.settle(target)).toBe(false)
    })
  })
})
