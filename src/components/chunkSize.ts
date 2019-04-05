export type ChunkSize = {
  getRoot: number
  measure: (n: number) => number
}

export function ChunkSize(root: number): ChunkSize {
  const self = {} as ChunkSize
  const size = { root }

  function measure(n: number): number {
    return (n / size.root) * 100
  }

  return Object.assign(self, {
    getRoot: measure(size.root),
    measure,
  })
}
