import { Limit } from '../components/limit'
import { ScrollLimit } from '../components/scrollLimit'

const snapSizes = [80, 40, 30, 40, 60]
const scrollSnaps = [10, -50, -85, -120, -170]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)

const getScrollLimit = (loop: boolean): Limit => {
  const scrollLimit = ScrollLimit({ contentSize, loop })
  return scrollLimit.measure(scrollSnaps)
}

describe('ScrollLimit', () => {
  test('Calculates correct scroll limit when loop is false', () => {
    const scrollLimit = getScrollLimit(false)
    expect(scrollLimit.max).toEqual(10)
    expect(scrollLimit.min).toEqual(-170)
  })
  test('Calculates correct scroll limit when loop is true', () => {
    const scrollLimit = getScrollLimit(true)
    expect(scrollLimit.max).toEqual(10)
    expect(scrollLimit.min).toEqual(-240)
  })
})
