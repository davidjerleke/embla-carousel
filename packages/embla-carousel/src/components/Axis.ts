import { NodeRectType } from './NodeRects'

export type AxisOptionType = 'x' | 'y'
export type AxisDirectionOptionType = 'ltr' | 'rtl'
type AxisEdgeType = 'top' | 'right' | 'bottom' | 'left'

export type AxisType = {
  scroll: AxisOptionType
  cross: AxisOptionType
  startEdge: AxisEdgeType
  endEdge: AxisEdgeType
  measureSize: (nodeRect: NodeRectType) => number
  direction: (n: number) => number
}

export function Axis(
  axis: AxisOptionType,
  contentDirection: AxisDirectionOptionType
): AxisType {
  const isRightToLeft = contentDirection === 'rtl'
  const isVertical = axis === 'y'
  const scroll = isVertical ? 'y' : 'x'
  const cross = isVertical ? 'x' : 'y'
  const sign = !isVertical && isRightToLeft ? -1 : 1
  const startEdge = getStartEdge()
  const endEdge = getEndEdge()

  function measureSize(nodeRect: NodeRectType): number {
    const { height, width } = nodeRect
    return isVertical ? height : width
  }

  function getStartEdge(): AxisEdgeType {
    if (isVertical) return 'top'
    return isRightToLeft ? 'right' : 'left'
  }

  function getEndEdge(): AxisEdgeType {
    if (isVertical) return 'bottom'
    return isRightToLeft ? 'left' : 'right'
  }

  function direction(n: number): number {
    return n * sign
  }

  const self: AxisType = {
    scroll,
    cross,
    startEdge,
    endEdge,
    measureSize,
    direction
  }
  return self
}
