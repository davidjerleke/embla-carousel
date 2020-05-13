import { Axis } from '../components/axis'

const horizontalAxis = 'x'
const verticalAxis = 'y'
const horizontalSize = 100
const verticalSize = 50

let mockHtmlElement = document.createElement('div')
mockHtmlElement.getBoundingClientRect = jest.fn(() => {
  return { width: horizontalSize, height: verticalSize } as DOMRect
})

describe('Axis', () => {
  describe('When selected axis is x, it', () => {
    const axis = Axis(horizontalAxis)

    test('Exposes x as the scroll axis', () => {
      expect(axis.scroll).toBe(horizontalAxis)
    })

    test('Exposes y as the cross axis', () => {
      expect(axis.cross).toBe(verticalAxis)
    })

    test('Measures the width dimension of the given node', () => {
      expect(axis.measure(mockHtmlElement)).toBe(horizontalSize)
    })
  })

  describe('When selected axis is y it', () => {
    const axis = Axis(verticalAxis)

    test('Exposes y as the scroll axis', () => {
      expect(axis.scroll).toBe(verticalAxis)
    })

    test('Exposes x as the cross axis', () => {
      expect(axis.cross).toBe(horizontalAxis)
    })

    test('Measures the height dimension of the given node', () => {
      expect(axis.measure(mockHtmlElement)).toBe(verticalSize)
    })
  })
})
