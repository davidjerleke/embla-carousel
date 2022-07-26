export type BreakpointKeyType = keyof typeof MEDIA

const mediaQuery = (
  value: number,
  minOrMax: 'min' | 'max' = 'min',
  widthOrHeight: 'width' | 'height' = 'width',
): string => {
  const queryValue = minOrMax === 'max' ? value - 1 : value
  return `@media (${minOrMax}-${widthOrHeight}: ${queryValue}px)`
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
  COMPACT: mediaQuery(BREAKPOINTS.MD, 'max'),
  DESKTOP: mediaQuery(BREAKPOINTS.MD, 'min'),
  MIN_XXS: mediaQuery(BREAKPOINTS.XXS, 'min'),
  MIN_XS: mediaQuery(BREAKPOINTS.XS, 'min'),
  MIN_SM: mediaQuery(BREAKPOINTS.SM, 'min'),
  MIN_MD: mediaQuery(BREAKPOINTS.MD, 'min'),
  MIN_LG: mediaQuery(BREAKPOINTS.LG, 'min'),
  MAX_XXS: mediaQuery(BREAKPOINTS.XXS, 'max'),
  MAX_XS: mediaQuery(BREAKPOINTS.XS, 'max'),
  MAX_SM: mediaQuery(BREAKPOINTS.SM, 'max'),
  MAX_MD: mediaQuery(BREAKPOINTS.MD, 'max'),
  MAX_LG: mediaQuery(BREAKPOINTS.LG, 'max'),
}
