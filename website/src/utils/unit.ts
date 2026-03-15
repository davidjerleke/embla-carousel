/* CONSTS */
const UNIT = 'rem'
const ROUNDING_SAFETY = 10000

/* UTILS */
function sizeRounded(size: number): number {
  return Math.round((size + Number.EPSILON) * ROUNDING_SAFETY) / ROUNDING_SAFETY
}

export function sizeWithUnit(size: number): string {
  return sizeRounded(size) + UNIT
}
