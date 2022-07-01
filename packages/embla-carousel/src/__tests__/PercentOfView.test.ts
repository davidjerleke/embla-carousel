import { PercentOfView } from '../components/PercentOfView'

const viewSize = 100
const percentage = 10
const noSize = 0

describe('PxToPercent', () => {
  test('Converts given number to percentage of view', () => {
    const measure = PercentOfView(viewSize).measure(percentage)
    expect(measure).toBe(10)
  })

  test('Returns 0 when view size is 0', () => {
    const measure = PercentOfView(noSize).measure(percentage)
    expect(measure).toBe(0)
  })

  test('Returns 0 when percentage is 0', () => {
    const measure = PercentOfView(viewSize).measure(noSize)
    expect(measure).toBe(0)
  })

  test('Returns 0 when view and percentage is 0', () => {
    const measure = PercentOfView(noSize).measure(noSize)
    expect(measure).toBe(0)
  })
})
