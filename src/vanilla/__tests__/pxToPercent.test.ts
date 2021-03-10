import { PxToPercent } from '../components/pxToPercent'

const viewInPx = 1000
const itemInPx = 250
const viewZero = 0
const itemInPercent = (itemInPx / viewInPx) * 100
const pxToPercent = PxToPercent(viewInPx)

describe('PxToPercent', () => {
  test('Exposes total percentage as 100', () => {
    expect(pxToPercent.totalPercent).toBe(100)
  })

  test('Converts given pixels to percentage of view', () => {
    const measure = pxToPercent.measure(itemInPx)
    expect(measure).toBe(itemInPercent)
  })

  test('Returns 0 when view size is 0', () => {
    const measure = PxToPercent(viewZero).measure(itemInPx)
    expect(measure).toBe(viewZero)
  })
})
