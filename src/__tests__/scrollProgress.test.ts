import { ScrollLimit } from '../components/scrollLimit'
import { ScrollProgress } from '../components/scrollProgress'
import { Vector1D } from '../components/vector1d'

const snapSizes = [80, 40, 30, 40, 60]
const scrollSnaps = [10, -50, -85, -120, -170]
const contentSize = snapSizes.reduce((a, s) => a + s, 0)
const startSnap = scrollSnaps[0]
const endSnap = scrollSnaps[scrollSnaps.length - 1]
const location = Vector1D(0)

const getScrollProgress = (loop: boolean): ScrollProgress => {
  const scrollLimit = ScrollLimit({ contentSize, loop })
  const limit = scrollLimit.measure(scrollSnaps)
  return ScrollProgress({ location, limit })
}

describe('ScrollProgress', () => {
  test('Calculates correct progress when loop is false', () => {
    const scrollProgress = getScrollProgress(false)

    location.setNumber(startSnap)
    expect(scrollProgress.get()).toBe(-0)
    location.setNumber(endSnap)
    expect(scrollProgress.get()).toBe(1)
  })

  test('Calculates correct progress when loop is true', () => {
    const scrollProgress = getScrollProgress(true)

    location.setNumber(startSnap)
    expect(scrollProgress.get()).toBe(-0)
    location.setNumber(endSnap)
    expect(scrollProgress.get()).toBe(0.72)
  })
})
