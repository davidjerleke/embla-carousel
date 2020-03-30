export type Alignments = 'start' | 'center' | 'end' | number

type Params = {
  viewSize: number
  align: Alignments
}

export type Alignment = {
  measure: (n: number) => number
}

export function Alignment(params: Params): Alignment {
  const { viewSize, align } = params
  const alignment = { start, center, end }

  function start(): number {
    return 0
  }

  function center(n: number): number {
    return (viewSize - n) / 2
  }

  function end(n: number): number {
    return viewSize - n
  }

  function percent(): number {
    return viewSize * Number(align)
  }

  function measure(n: number): number {
    if (typeof align === 'number') return percent()
    return alignment[align](n)
  }

  const self: Alignment = {
    measure,
  }
  return Object.freeze(self)
}
