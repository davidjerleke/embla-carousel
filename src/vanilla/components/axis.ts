export type AxisOption = 'x' | 'y'

export type Axis = {
  cross: AxisOption
  scroll: AxisOption
  measure: (node: HTMLElement) => number
}

export function Axis(axis: AxisOption): Axis {
  const scroll = axis === 'y' ? 'y' : 'x'
  const cross = axis === 'y' ? 'x' : 'y'

  function measure(node: HTMLElement): number {
    const { width, height } = node.getBoundingClientRect()
    return scroll === 'x' ? width : height
  }

  const self: Axis = {
    cross,
    measure,
    scroll,
  }
  return self
}
