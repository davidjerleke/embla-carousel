export type ChunkSize = {
  getRoot: number
  measure: (n: number) => number
}

export function ChunkSize(root: number): ChunkSize {
  const size = { root }

  function measure(n: number): number {
    return (n / size.root) * 100
  }

  const self: ChunkSize = {
    getRoot: 100,
    measure,
  }
  return Object.freeze(self)
}
