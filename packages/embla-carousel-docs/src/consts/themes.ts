import { css, FlattenSimpleInterpolation } from 'styled-components'

const colorsToVariables = (colors: { [key: string]: string }): string => {
  const colorKeys = Object.keys(colors)
  const colorNames = colorKeys.map((colorKey) =>
    colorKey
      .split('')
      .map((c) => (c === c.toUpperCase() ? '-' + c.toLowerCase() : c))
      .join(''),
  )
  return Object.keys(colors).reduce(
    (acc, colorKey, index) =>
      acc + `--${colorNames[index]}:${colors[colorKey]};`,
    '',
  )
}

const rgbValuesToVariables = (
  styledComponentsCss: FlattenSimpleInterpolation,
): string => {
  const css = (styledComponentsCss[0] || '') as string
  return css.replace(/:/g, '-rgb-value:').replace(/rgb\(|\)/g, '')
}

export const THEME_META_SELECTOR = `meta[name='theme-color']`

export const THEME_PREFIX = 'theme-'

export type ThemeKeyType = `${THEME_KEYS}`

export enum THEME_KEYS {
  LIGHT = 'light',
  DARK = 'dark',
}

export const THEME_COLORS = {
  [THEME_KEYS.LIGHT]: {
    brandPrimary: 'rgb(47, 114, 193)',
    brandSecondary: 'rgb(116, 99, 195)',
    brandAlternative: 'rgb(19, 120, 134)',
    backgroundSite: 'rgb(255, 255, 255)',
    backgroundCode: 'rgb(249, 249, 249)',
    textBody: 'rgb(54, 49, 61)',
    textComment: 'rgb(99, 94, 105)',
    textHighContrast: 'rgb(49, 49, 49)',
    textMediumContrast: 'rgb(99, 94, 105)',
    textLowContrast: 'rgb(120, 117, 122)',
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
    textHighContrast: 'rgb(230, 230, 230)',
    textMediumContrast: 'rgb(202, 202, 202)',
    textLowContrast: 'rgb(170, 170, 170)',
    detailHighContrast: 'rgb(101, 101, 101)',
    detailMediumContrast: 'rgb(25, 25, 25)',
    detailLowContrast: 'rgb(21, 21, 21)',
    scrollThumb: 'rgb(41, 41, 41)',
  },
}

const THEME_LIGHT = css`
  ${colorsToVariables(THEME_COLORS[THEME_KEYS.LIGHT])}
`

const THEME_DARK = css`
  ${colorsToVariables(THEME_COLORS[THEME_KEYS.DARK])}
`

export const themeStyles = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    ${THEME_LIGHT}
    ${rgbValuesToVariables(THEME_LIGHT)}
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    ${THEME_DARK}
    ${rgbValuesToVariables(THEME_DARK)}
  }
`
