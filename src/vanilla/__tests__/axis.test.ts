import { Axis, AxisOption } from '../components/axis'
import { DirectionOption } from '../components/direction'

const horizontalAxis = 'x'
const verticalAxis = 'y'
const ltrDirection = 'ltr'
const rtlDirection = 'rtl'
const horizontalSize = 100
const verticalSize = 50
const mockRect = {
  width: horizontalSize,
  height: verticalSize,
} as DOMRect

const getAxis = (axis: AxisOption, contentDirection: DirectionOption): Axis =>
  Axis(axis, contentDirection)

describe('Axis', () => {
  describe('When axis is X and direction is LTR, it', () => {
    const axis = getAxis(horizontalAxis, ltrDirection)

    test('Exposes X as the scroll axis', () => {
      expect(axis.scroll).toBe(horizontalAxis)
    })

    test('Exposes Y as the cross axis', () => {
      expect(axis.cross).toBe(verticalAxis)
    })

    test('Exposes LEFT as the start edge', () => {
      expect(axis.startEdge).toBe('left')
    })

    test('Exposes RIGHT as the end edge', () => {
      expect(axis.endEdge).toBe('right')
    })

    test('Measures the WIDTH dimension of the given node', () => {
      expect(axis.measureSize(mockRect)).toBe(horizontalSize)
    })
  })

  describe('When axis is X and direction is RTL, it', () => {
    const axis = getAxis(horizontalAxis, rtlDirection)

    test('Exposes X as the scroll axis', () => {
      expect(axis.scroll).toBe(horizontalAxis)
    })

    test('Exposes Y as the cross axis', () => {
      expect(axis.cross).toBe(verticalAxis)
    })

    test('Exposes RIGHT as the start edge', () => {
      expect(axis.startEdge).toBe('right')
    })

    test('Exposes LEFT as the end edge', () => {
      expect(axis.endEdge).toBe('left')
    })

    test('Measures the WIDTH dimension of the given node', () => {
      expect(axis.measureSize(mockRect)).toBe(horizontalSize)
    })
  })

  describe('When axis is Y and direction is LTR, it', () => {
    const axis = getAxis(verticalAxis, ltrDirection)

    test('Exposes Y as the scroll axis', () => {
      expect(axis.scroll).toBe(verticalAxis)
    })

    test('Exposes X as the cross axis', () => {
      expect(axis.cross).toBe(horizontalAxis)
    })

    test('Exposes TOP as the start edge', () => {
      expect(axis.startEdge).toBe('top')
    })

    test('Exposes BOTTOM as the end edge', () => {
      expect(axis.endEdge).toBe('bottom')
    })

    test('Measures the HEIGHT dimension of the given node', () => {
      expect(axis.measureSize(mockRect)).toBe(verticalSize)
    })
  })

  describe('When axis is Y and direction is RTL, it', () => {
    const axis = getAxis(verticalAxis, rtlDirection)

    test('Exposes Y as the scroll axis', () => {
      expect(axis.scroll).toBe(verticalAxis)
    })

    test('Exposes X as the cross axis', () => {
      expect(axis.cross).toBe(horizontalAxis)
    })

    test('Exposes TOP as the start edge', () => {
      expect(axis.startEdge).toBe('top')
    })

    test('Exposes BOTTOM as the end edge', () => {
      expect(axis.endEdge).toBe('bottom')
    })

    test('Measures the HEIGHT dimension of the given node', () => {
      expect(axis.measureSize(mockRect)).toBe(verticalSize)
    })
  })
})
