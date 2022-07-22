import { css, FlattenSimpleInterpolation } from 'styled-components'

const camelCaseToPascalCase = (string: string = ''): string =>
  string
    .split('')
    .map((c) => (c === c.toUpperCase() ? '-' + c.toLowerCase() : c))
    .join('')

const themeToColorVariableStyles = (colors: {
  [key: string]: string
}): string => {
  const colorNames = Object.keys(colors).map(camelCaseToPascalCase)
  return Object.keys(colors).reduce(
    (acc, colorKey, index) =>
      acc + `--${colorNames[index]}:${colors[colorKey]};`,
    '',
  )
}

const themeToRGBVariableStyles = (
  styledComponentsCss: FlattenSimpleInterpolation,
): string => {
  const css = <string>styledComponentsCss[0] || ''
  return css.replace(/:/g, '-rgb-value:').replace(/rgb\(|\)/g, '')
}

export const THEME_META_SELECTOR = `meta[name='theme-color']`

export const THEME_PREFIX = 'theme-'

export type ThemeKeyType = typeof THEME_KEYS[keyof typeof THEME_KEYS]

export const THEME_KEYS = <const>{
  LIGHT: 'light',
  DARK: 'dark',
}

export const THEME_COLORS = {
  [THEME_KEYS.LIGHT]: {
    brandPrimary: 'rgb(47, 112, 193)',
    brandSecondary: 'rgb(116, 97, 195)',
    brandAlternative: 'rgb(19, 120, 134)',
    backgroundSite: 'rgb(249, 249, 249)',
    backgroundCode: 'rgb(244, 244, 244)',
    textBody: 'rgb(54, 49, 61)',
    textComment: 'rgb(99, 94, 105)',
    textAdmonitionNote: 'rgb(46, 109, 188)',
    textHighContrast: 'rgb(49, 49, 49)',
    textMediumContrast: 'rgb(99, 94, 105)',
    textLowContrast: 'rgb(120, 112, 122)',
    detailHighContrast: 'rgb(192, 192, 192)',
    detailMediumContrast: 'rgb(234, 234, 234)',
    detailLowContrast: 'rgb(240, 240, 242)',
    scrollThumb: 'rgb(226, 226, 226)',
  },
  [THEME_KEYS.DARK]: {
    brandPrimary: 'rgb(138, 180, 248)',
    brandSecondary: 'rgb(193, 168, 226)',
    brandAlternative: 'rgb(136, 186, 191)',
    backgroundSite: 'rgb(0, 0, 0)',
    backgroundCode: 'rgb(12, 12, 12)',
    textBody: 'rgb(222, 222, 222)',
    textComment: 'rgb(170, 170, 170)',
    textAdmonitionNote: 'rgb(138, 180, 248)',
    textHighContrast: 'rgb(230, 230, 230)',
    textMediumContrast: 'rgb(202, 202, 202)',
    textLowContrast: 'rgb(170, 170, 170)',
    detailHighContrast: 'rgb(101, 101, 101)',
    detailMediumContrast: 'rgb(25, 25, 25)',
    detailLowContrast: 'rgb(21, 21, 21)',
    scrollThumb: 'rgb(41, 41, 41)',
  },
}

const themeLightStyles = css`
  ${themeToColorVariableStyles(THEME_COLORS[THEME_KEYS.LIGHT])}
`

const themeDarkStyles = css`
  ${themeToColorVariableStyles(THEME_COLORS[THEME_KEYS.DARK])}
`

export const themeStyles = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    ${themeLightStyles}
    ${themeToRGBVariableStyles(themeLightStyles)}
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    ${themeDarkStyles}
    ${themeToRGBVariableStyles(themeDarkStyles)}
  }
`
