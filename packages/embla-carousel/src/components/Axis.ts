import { NodeRectType } from './NodeHandler'
import { NumberStoreInputType, mapStoreToNumber } from './utils'

export type AxisOptionType = 'x' | 'y'
export type AxisDirectionOptionType = 'ltr' | 'rtl'
type AxisEdgeType = 'top' | 'right' | 'bottom' | 'left'

export type AxisType = {
  scroll: AxisOptionType
  cross: AxisOptionType
  startEdge: AxisEdgeType
  endEdge: AxisEdgeType
  nativeScroll: 'scrollLeft' | 'scrollTop'
  getSize: (nodeRect: NodeRectType) => number
  direction: (input: NumberStoreInputType) => number
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
  const nativeScroll = isVertical ? 'scrollTop' : 'scrollLeft'

  function getSize(nodeRect: NodeRectType): number {
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

  function direction(input: number): number {
    return input * sign
  }

  const self: AxisType = {
    scroll,
    cross,
    startEdge,
    endEdge,
    nativeScroll,
    getSize,
    direction: mapStoreToNumber(direction)
  }
  return self
}
