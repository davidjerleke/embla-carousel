import { PxToPercent } from '../components/pxToPercent'

const viewInPx = 1000
const itemInPx = 250
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
})
