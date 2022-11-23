import { css } from 'styled-components'
import { snakeCaseToKebabCase } from 'utils/snakeCaseToKebabCase'

export type ThemeKeyType = typeof THEME_KEYS[keyof typeof THEME_KEYS]

type ThemeColorsType = { [key in keyof typeof THEME_COLORS.light]: string }

const colorsToCssVariableMap = (colors: ThemeColorsType): ThemeColorsType => {
  return Object.keys(colors).reduce((map, key) => {
    const variable = `var(--${snakeCaseToKebabCase(key)})`
    return { ...map, [key]: variable }
  }, <ThemeColorsType>{})
}

const themeToColorVariableStyles = (colors: ThemeColorsType): string => {
  const colorNames = Object.keys(colors).map(snakeCaseToKebabCase)

  return Object.keys(colors).reduce((acc, colorKey, index) => {
    const value = colors[<keyof ThemeColorsType>colorKey]
    const key = colorNames[index]
    const variableWithValue = `--${key}:${value};`

    return acc + variableWithValue
  }, '')
}

export const THEME_META_SELECTOR = `meta[name='theme-color']`

export const THEME_PREFIX = 'theme-'

export const THEME_KEYS = <const>{
  LIGHT: 'light',
  DARK: 'dark',
}

export const THEME_COLORS = {
  [THEME_KEYS.LIGHT]: {
    BRAND_PRIMARY: 'rgb(47, 112, 193)',
    BRAND_SECONDARY: 'rgb(116, 97, 195)',
    BRAND_ALTERNATIVE: 'rgb(19, 120, 134)',
    BACKGROUND_SITE: 'rgb(249, 249, 249)',
    BACKGROUND_CODE: 'rgb(244, 244, 244)',
    TEXT_BODY: 'rgb(54, 49, 61)',
    TEXT_COMMENT: 'rgb(99, 94, 105)',
    TEXT_ADMONITION_NOTE: 'rgb(46, 109, 188)',
    TEXT_HIGH_CONTRAST: 'rgb(49, 49, 49)',
    TEXT_MEDIUM_CONTRAST: 'rgb(99, 94, 105)',
    TEXT_LOW_CONTRAST: 'rgb(120, 112, 122)',
    DETAIL_HIGH_CONTRAST: 'rgb(192, 192, 192)',
    DETAIL_MEDIUM_CONTRAST: 'rgb(234, 234, 234)',
    DETAIL_LOW_CONTRAST: 'rgb(240, 240, 242)',
    SCROLL_THUMB: 'rgb(226, 226, 226)',
    BRAND_PRIMARY_RGB_VALUE: '47, 112, 193',
    BRAND_SECONDARY_RGB_VALUE: '116, 97, 195',
    BRAND_ALTERNATIVE_RGB_VALUE: '19, 120, 134',
    BACKGROUND_SITE_RGB_VALUE: '249, 249, 249',
    BACKGROUND_CODE_RGB_VALUE: '244, 244, 244',
    TEXT_BODY_RGB_VALUE: '54, 49, 61',
    TEXT_COMMENT_RGB_VALUE: '99, 94, 105',
    TEXT_ADMONITION_NOTE_RGB_VALUE: '46, 109, 188',
    TEXT_HIGH_CONTRAST_RGB_VALUE: '49, 49, 49',
    TEXT_MEDIUM_CONTRAST_RGB_VALUE: '99, 94, 105',
    TEXT_LOW_CONTRAST_RGB_VALUE: '120, 112, 122',
    DETAIL_HIGH_CONTRAST_RGB_VALUE: '192, 192, 192',
    DETAIL_MEDIUM_CONTRAST_RGB_VALUE: '234, 234, 234',
    DETAIL_LOW_CONTRAST_RGB_VALUE: '240, 240, 242',
    SCROLL_THUMB_RGB_VALUE: '226, 226, 226',
  },
  [THEME_KEYS.DARK]: {
    BRAND_PRIMARY: 'rgb(138, 180, 248)',
    BRAND_SECONDARY: 'rgb(193, 168, 226)',
    BRAND_ALTERNATIVE: 'rgb(136, 186, 191)',
    BACKGROUND_SITE: 'rgb(0, 0, 0)',
    BACKGROUND_CODE: 'rgb(12, 12, 12)',
    TEXT_BODY: 'rgb(222, 222, 222)',
    TEXT_COMMENT: 'rgb(170, 170, 170)',
    TEXT_ADMONITION_NOTE: 'rgb(138, 180, 248)',
    TEXT_HIGH_CONTRAST: 'rgb(230, 230, 230)',
    TEXT_MEDIUM_CONTRAST: 'rgb(202, 202, 202)',
    TEXT_LOW_CONTRAST: 'rgb(170, 170, 170)',
    DETAIL_HIGH_CONTRAST: 'rgb(101, 101, 101)',
    DETAIL_MEDIUM_CONTRAST: 'rgb(25, 25, 25)',
    DETAIL_LOW_CONTRAST: 'rgb(21, 21, 21)',
    SCROLL_THUMB: 'rgb(41, 41, 41)',
    BRAND_PRIMARY_RGB_VALUE: '138, 180, 248',
    BRAND_SECONDARY_RGB_VALUE: '193, 168, 226',
    BRAND_ALTERNATIVE_RGB_VALUE: '136, 186, 191',
    BACKGROUND_SITE_RGB_VALUE: '0, 0, 0',
    BACKGROUND_CODE_RGB_VALUE: '12, 12, 12',
    TEXT_BODY_RGB_VALUE: '222, 222, 222',
    TEXT_COMMENT_RGB_VALUE: '170, 170, 170',
    TEXT_ADMONITION_NOTE_RGB_VALUE: '138, 180, 248',
    TEXT_HIGH_CONTRAST_RGB_VALUE: '230, 230, 230',
    TEXT_MEDIUM_CONTRAST_RGB_VALUE: '202, 202, 202',
    TEXT_LOW_CONTRAST_RGB_VALUE: '170, 170, 170',
    DETAIL_HIGH_CONTRAST_RGB_VALUE: '101, 101, 101',
    DETAIL_MEDIUM_CONTRAST_RGB_VALUE: '25, 25, 25',
    DETAIL_LOW_CONTRAST_RGB_VALUE: '21, 21, 21',
    SCROLL_THUMB_RGB_VALUE: '41, 41, 41',
  },
}

export const COLORS = colorsToCssVariableMap(THEME_COLORS[THEME_KEYS.LIGHT])

const themeLightStyles = css`
  ${themeToColorVariableStyles(THEME_COLORS[THEME_KEYS.LIGHT])}
`

const themeDarkStyles = css`
  ${themeToColorVariableStyles(THEME_COLORS[THEME_KEYS.DARK])}
`

export const themeStyles = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    ${themeLightStyles}
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    ${themeDarkStyles}
  }
`
