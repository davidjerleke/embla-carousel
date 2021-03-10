import { Limit } from '../components/limit'
import { ScrollLimit } from '../components/scrollLimit'

const snapSizes = [80, 40, 30, 40, 60]
const scrollSnaps = [10, -50, -85, -120, -170]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)

const getScrollLimit = (loop: boolean): Limit => {
  return ScrollLimit(contentSize, scrollSnaps, loop).limit
}

describe('ScrollLimit', () => {
  describe('When loop is', () => {
    test('False, it starts at first snap and ends at last snap', () => {
      const scrollLimit = getScrollLimit(false)
      expect(scrollLimit.max).toEqual(10)
      expect(scrollLimit.min).toEqual(-170)
    })

    test('True, it starts at first snap and ends at first snap minus content size', () => {
      const scrollLimit = getScrollLimit(true)
      expect(scrollLimit.max).toEqual(10)
      expect(scrollLimit.min).toEqual(-240)
    })
  })
})
