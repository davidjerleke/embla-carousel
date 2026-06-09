export type BreakpointKeyType = keyof typeof MEDIA

/* CONSTS */
export const BREAKPOINTS = {
  DEFAULT: 0,
  XXS: 350,
  XS: 576,
  SM: 750,
  MD: 992,
  LG: 1200
}

export const BREAKPOINT_COMPACT = BREAKPOINTS.MD

export const MEDIA = {
  NO_HOVER: '@media (hover: none), (hover: on-demand)',
  HOVER: '@media (hover: hover)',

  COMPACT: getMediaQuery(BREAKPOINT_COMPACT, 'max'),
  DESKTOP: getMediaQuery(BREAKPOINT_COMPACT, 'min'),

  MIN_XXS: getMediaQuery(BREAKPOINTS.XXS, 'min'),
  MIN_XS: getMediaQuery(BREAKPOINTS.XS, 'min'),
  MIN_SM: getMediaQuery(BREAKPOINTS.SM, 'min'),
  MIN_MD: getMediaQuery(BREAKPOINTS.MD, 'min'),
  MIN_LG: getMediaQuery(BREAKPOINTS.LG, 'min'),

  MAX_XXS: getMediaQuery(BREAKPOINTS.XXS, 'max'),
  MAX_XS: getMediaQuery(BREAKPOINTS.XS, 'max'),
  MAX_SM: getMediaQuery(BREAKPOINTS.SM, 'max'),
  MAX_MD: getMediaQuery(BREAKPOINTS.MD, 'max'),
  MAX_LG: getMediaQuery(BREAKPOINTS.LG, 'max'),

  WHEN: (query: string): string => {
    const string = query.replace(/@media\s/g, '')
    return `@media ${string}`
  }
}

/* UTILS */
function getMediaQuery(
  value: number,
  minOrMax: 'min' | 'max' = 'min',
  widthOrHeight: 'width' | 'height' = 'width'
): string {
  const queryValue = minOrMax === 'max' ? value - 1 : value
  return `@media (${minOrMax}-${widthOrHeight}: ${queryValue}px)`
}
