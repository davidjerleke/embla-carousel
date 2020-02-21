import { PxToPercent } from '../components/pxToPercent'

const itemSize = 25
const wiewInPx = 1000
const pxToPercent = PxToPercent(wiewInPx)

describe('PxToPercent', () => {
  test('Exposes correct totalPercent', () => {
    expect(pxToPercent.totalPercent).toBe(100)
  })

  test('Converts given pixels to percentage of view', () => {
    const measure = pxToPercent.measure(itemSize)
    expect(measure).toBe(2.5)
  })
})
