import { css, FlattenSimpleInterpolation } from 'styled-components'

const rgbValuesToVariables = (
  styledComponentsCss: FlattenSimpleInterpolation,
): string => {
  const css = (styledComponentsCss[0] || '') as string
  return css.replace(/:/g, '-rgb-value:').replace(/rgb\(|\)/g, '')
}

export const THEME_PREFIX = 'theme-'

export type ThemeKeyType = `${THEME_KEYS}`

export enum THEME_KEYS {
  LIGHT = 'light',
  DARK = 'dark',
}

const THEME_LIGHT = css`
  --brand-primary: rgb(47, 114, 193);
  --brand-secondary: rgb(116, 99, 195);
  --brand-alternative: rgb(19, 120, 134);
  --background-site: rgb(255, 255, 255);
  --background-code: rgb(249, 249, 249);
  --text-body: rgb(54, 49, 61);
  --text-comment: rgb(99, 94, 105);
  --text-high-contrast: rgb(49, 49, 49);
  --text-medium-contrast: rgb(99, 94, 105);
  --text-low-contrast: rgb(120, 117, 122);
  --detail-high-contrast: rgb(192, 192, 192);
  --detail-medium-contrast: rgb(234, 234, 234);
  --detail-low-contrast: rgb(240, 240, 242);
  --scroll-thumb: rgb(226, 226, 226);
`

const THEME_DARK = css`
  --brand-primary: rgb(138, 180, 248);
  --brand-secondary: rgb(193, 168, 226);
  --brand-alternative: rgb(136, 186, 191);
  --background-site: rgb(0, 0, 0);
  --background-code: rgb(12, 12, 12);
  --text-body: rgb(222, 222, 222);
  --text-comment: rgb(170, 170, 170);
  --text-high-contrast: rgb(230, 230, 230);
  --text-medium-contrast: rgb(202, 202, 202);
  --text-low-contrast: rgb(170, 170, 170);
  --detail-high-contrast: rgb(101, 101, 101);
  --detail-medium-contrast: rgb(25, 25, 25);
  --detail-low-contrast: rgb(21, 21, 21);
  --scroll-thumb: rgb(41, 41, 41);
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
