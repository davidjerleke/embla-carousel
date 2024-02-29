export function clampNumber(number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max)
}

export function isNumber(value: number | null): value is number {
  return typeof value === 'number' && !isNaN(value)
}
