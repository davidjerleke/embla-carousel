export type Alignments = 'start' | 'center' | 'end'

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

  function start(n: number): number {
    return n * 0
  }

  function center(n: number): number {
    return (viewSize - n) / 2
  }

  function end(n: number): number {
    return viewSize - n
  }

  function measure(n: number): number {
    return alignment[align](n)
  }

  const self: Alignment = {
    measure,
  }
  return Object.freeze(self)
}
