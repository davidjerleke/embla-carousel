const createMediaQuery = (
  value: number,
  minOrMax: 'min' | 'max' = 'min',
  dimension: 'width' | 'height' = 'width',
): string => {
  const queryValue = minOrMax === 'max' ? value - 1 : value
  return `@media (${minOrMax}-${dimension}: ${queryValue}px)`
}

export const BREAKPOINTS = {
  DEFAULT: 0,
  XXS: 350,
  XS: 576,
  SM: 750,
  MD: 992,
  LG: 1200,
}

export const MEDIA = {
  COMPACT: createMediaQuery(BREAKPOINTS.MD, 'max'),
  DESKTOP: createMediaQuery(BREAKPOINTS.MD, 'min'),
  MIN_XXS: createMediaQuery(BREAKPOINTS.XXS, 'min'),
  MIN_XS: createMediaQuery(BREAKPOINTS.XS, 'min'),
  MIN_SM: createMediaQuery(BREAKPOINTS.SM, 'min'),
  MIN_MD: createMediaQuery(BREAKPOINTS.MD, 'min'),
  MIN_LG: createMediaQuery(BREAKPOINTS.LG, 'min'),
  MAX_XXS: createMediaQuery(BREAKPOINTS.XXS, 'max'),
  MAX_XS: createMediaQuery(BREAKPOINTS.XS, 'max'),
  MAX_SM: createMediaQuery(BREAKPOINTS.SM, 'max'),
  MAX_MD: createMediaQuery(BREAKPOINTS.MD, 'max'),
  MAX_LG: createMediaQuery(BREAKPOINTS.LG, 'max'),
}

export type BreakpointKeyType = keyof typeof MEDIA
