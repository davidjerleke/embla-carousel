export const numberWithinRange = (
  number: number,
  min: number,
  max: number,
): number => Math.min(Math.max(number, min), max)
