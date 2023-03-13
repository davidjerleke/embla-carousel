import { LogoLightIcon, LogoDarkIcon } from 'components/SiteLogo/SiteLogo'
import { LightThemeSvg, DarkThemeSvg } from 'components/Theme/ThemeToggle'
import { THEME_KEYS, THEME_PREFIX } from 'consts/themes'
import { css } from 'styled-components'

export const THEME_STYLES = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    color-scheme: ${THEME_KEYS.LIGHT};

    ${LogoDarkIcon}, ${LightThemeSvg} {
      display: none;
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    color-scheme: ${THEME_KEYS.DARK};

    ${LogoLightIcon}, ${DarkThemeSvg} {
      display: none;
    }
  }
`
