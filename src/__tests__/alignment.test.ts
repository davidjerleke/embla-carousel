import { Alignment } from '../components/alignment'

const viewSize = 1000
const itemSize = 100

describe('Alignment', () => {
  test('Measures start alignment for given number correctly', () => {
    const startAlign = Alignment({ align: 'start', viewSize })
    const measure = startAlign.measure(itemSize)
    expect(measure).toBe(0)
  })

  test('Measures center alignment for given number correctly', () => {
    const centerAlign = Alignment({ align: 'center', viewSize })
    const measure = centerAlign.measure(itemSize)
    expect(measure).toBe(450)
  })

  test('Measures end alignment for given number correctly', () => {
    const endAlign = Alignment({ align: 'end', viewSize })
    const measure = endAlign.measure(itemSize)
    expect(measure).toBe(900)
  })
})
