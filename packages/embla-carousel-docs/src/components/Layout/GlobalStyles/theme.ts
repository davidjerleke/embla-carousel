import { LightThemeSvg, DarkThemeSvg } from 'components/Theme/ThemeToggle'
import { THEME_KEYS, THEME_PREFIX } from 'consts/themes'
import { css } from 'styled-components'
import {
  LogoLightIcon,
  LogoDarkIcon,
  LogoLightImage,
  LogoDarkImage
} from 'components/SiteLogo/SiteLogo'

export const THEME_STYLES = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    color-scheme: ${THEME_KEYS.LIGHT};

    ${LogoDarkIcon}, ${LogoDarkImage}, ${LightThemeSvg} {
      display: none;
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    color-scheme: ${THEME_KEYS.DARK};

    ${LogoLightIcon}, ${LogoLightImage}, ${DarkThemeSvg} {
      display: none;
    }
  }
`
