import { LightThemeSvg, DarkThemeSvg } from '@/components/Theme/ThemeToggle'
import { css } from 'styled-components'
import {
  THEME_CLASSNAME_DARK,
  THEME_CLASSNAME_LIGHT,
  THEME_KEYS
} from '@/utils/theme'
import {
  LogoLightIcon,
  LogoDarkIcon,
  LogoLightImage,
  LogoDarkImage
} from '@/components/SiteLogo/SiteLogo'

export const THEME_STYLES = css`
  .${THEME_CLASSNAME_LIGHT} {
    color-scheme: ${THEME_KEYS.LIGHT};

    ${LogoDarkIcon}, ${LogoDarkImage}, ${LightThemeSvg} {
      display: none;
    }
  }
  .${THEME_CLASSNAME_DARK} {
    color-scheme: ${THEME_KEYS.DARK};

    ${LogoLightIcon}, ${LogoLightImage}, ${DarkThemeSvg} {
      display: none;
    }
  }
`
