import { Alignments } from './options'

interface Params {
  root: number
  align: Alignments
}

export interface AlignSize {
  measure(n: number): number
}

export function AlignSize(params: Params): AlignSize {
  const self = {} as AlignSize
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

  return Object.assign(self, {
    measure,
  })
}
