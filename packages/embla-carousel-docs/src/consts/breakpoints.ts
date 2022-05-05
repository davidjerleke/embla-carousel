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

export const breakpoints = {
  compact: createMediaQuery(BREAKPOINTS.MD, 'max'),
  desktop: createMediaQuery(BREAKPOINTS.MD, 'min'),
  minXxs: createMediaQuery(BREAKPOINTS.XXS, 'min'),
  minXs: createMediaQuery(BREAKPOINTS.XS, 'min'),
  minSm: createMediaQuery(BREAKPOINTS.SM, 'min'),
  minMd: createMediaQuery(BREAKPOINTS.MD, 'min'),
  minLg: createMediaQuery(BREAKPOINTS.LG, 'min'),
  maxXxs: createMediaQuery(BREAKPOINTS.XXS, 'max'),
  maxXs: createMediaQuery(BREAKPOINTS.XS, 'max'),
  maxSm: createMediaQuery(BREAKPOINTS.SM, 'max'),
  maxMd: createMediaQuery(BREAKPOINTS.MD, 'max'),
  maxLg: createMediaQuery(BREAKPOINTS.LG, 'max'),
}

export type BreakpointKeyType = keyof typeof breakpoints
