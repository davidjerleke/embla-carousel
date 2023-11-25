import { DirectionOptionType } from './Direction'
import { NodeRectType } from './NodeRects'

export type AxisOptionType = 'x' | 'y'
type AxisEdgeType = 'top' | 'right' | 'bottom' | 'left'

export type AxisType = {
  scroll: AxisOptionType
  cross: AxisOptionType
  startEdge: AxisEdgeType
  endEdge: AxisEdgeType
  measureSize: (nodeRect: NodeRectType) => number
}

export function Axis(
  axis: AxisOptionType,
  direction: DirectionOptionType
): AxisType {
  const scroll = axis === 'y' ? 'y' : 'x'
  const cross = axis === 'y' ? 'x' : 'y'
  const startEdge = getStartEdge()
  const endEdge = getEndEdge()

  function measureSize(nodeRect: NodeRectType): number {
    const { width, height } = nodeRect
    return scroll === 'x' ? width : height
  }

  function getStartEdge(): AxisEdgeType {
    if (scroll === 'y') return 'top'
    return direction === 'rtl' ? 'right' : 'left'
  }

  function getEndEdge(): AxisEdgeType {
    if (scroll === 'y') return 'bottom'
    return direction === 'rtl' ? 'left' : 'right'
  }

  const self: AxisType = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize
  }
  return self
}
