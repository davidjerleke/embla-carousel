export type NodeRectType = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export type NodeRectsType = {
  measure: (node: HTMLElement) => NodeRectType
}

export function NodeRects(): NodeRectsType {
  function measure(node: HTMLElement): NodeRectType {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = node
    const offset: NodeRectType = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    }

    return offset
  }

  const self: NodeRectsType = {
    measure
  }
  return self
}
