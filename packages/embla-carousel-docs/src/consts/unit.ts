const UNIT = 'rem'
const ROUNDING_SAFETY = 10000

const sizeRounded = (size: number): number =>
  Math.round((size + Number.EPSILON) * ROUNDING_SAFETY) / ROUNDING_SAFETY

export const sizeWithUnit = (size: number): string => sizeRounded(size) + UNIT
