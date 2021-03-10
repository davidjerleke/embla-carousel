import { DirectionOption } from './direction'

export type AxisOption = 'x' | 'y'
type AxisEdge = 'top' | 'right' | 'bottom' | 'left'

type Params = {
  axis: AxisOption
  contentDirection: DirectionOption
}

export type Axis = {
  scroll: AxisOption
  cross: AxisOption
  startEdge: AxisEdge
  endEdge: AxisEdge
  measureSize: (rect: DOMRect) => number
}

export function Axis(params: Params): Axis {
  const { axis, contentDirection } = params
  const scroll = axis === 'y' ? 'y' : 'x'
  const cross = axis === 'y' ? 'x' : 'y'
  const startEdge = getStartEdge()
  const endEdge = getEndEdge()

  function measureSize(rect: DOMRect): number {
    const { width, height } = rect
    return scroll === 'x' ? width : height
  }

  function getStartEdge(): AxisEdge {
    if (scroll === 'y') return 'top'
    return contentDirection === 'rtl' ? 'right' : 'left'
  }

  function getEndEdge(): AxisEdge {
    if (scroll === 'y') return 'bottom'
    return contentDirection === 'rtl' ? 'left' : 'right'
  }

  const self: Axis = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
  }
  return self
}
