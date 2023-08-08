Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: matchingMediaQueries.includes(query),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
})

let matchingMediaQueries: string[] = []

export function setMatchingMediaQuery(queries: string | string[]): void {
  matchingMediaQueries = Array.isArray(queries) ? queries : [queries]
}

export function resetMatchingMediaQuery(): void {
  matchingMediaQueries = []
}
