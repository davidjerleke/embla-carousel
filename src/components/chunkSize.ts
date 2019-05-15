export type ChunkSize = {
  measure: (n: number) => number
  root: number
}

export function ChunkSize(root: number): ChunkSize {
  const size = { root }

  function measure(n: number): number {
    return (n / size.root) * 100
  }

  const self: ChunkSize = {
    measure,
    root: 100,
  }
  return Object.freeze(self)
}
