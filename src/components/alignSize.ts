export type Alignments = 'start' | 'center' | 'end'

type Params = {
  root: number
  align: Alignments
}

export type AlignSize = {
  measure: (n: number) => number
}

export function AlignSize(params: Params): AlignSize {
  const { root, align } = params
  const alignment = { start, center, end }

  function start(n: number): number {
    return n * 0
  }

  function center(n: number): number {
    return (root - n) / 2
  }

  function end(n: number): number {
    return root - n
  }

  function measure(n: number): number {
    return alignment[align](n)
  }

  const self: AlignSize = {
    measure,
  }
  return Object.freeze(self)
}
