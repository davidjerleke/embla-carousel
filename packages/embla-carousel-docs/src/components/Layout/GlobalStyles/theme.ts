import { LogoLightIcon, LogoDarkIcon } from 'components/SiteLogo'
import { LightThemeSvg, DarkThemeSvg } from 'components/Theme'
import { THEME_KEYS, THEME_PREFIX } from 'consts'
import { css } from 'styled-components'

export const themeStyles = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    ${LogoDarkIcon}, ${LightThemeSvg} {
      display: none;
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    ${LogoLightIcon}, ${DarkThemeSvg} {
      display: none;
    }
  }
`
