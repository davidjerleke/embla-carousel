import { LogoLightIcon, LogoDarkIcon } from 'components/SiteLogo'
import { SunSvg, MoonSvg } from 'components/Theme'
import { HeroLogo } from 'components/Hero'
import { THEME_KEYS, THEME_PREFIX } from 'consts'
import { css } from 'styled-components'

export const themeStyles = css`
  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    ${LogoDarkIcon}, ${SunSvg} {
      display: none;
    }
    ${HeroLogo} {
      opacity: 0.1;
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    ${LogoLightIcon}, ${MoonSvg} {
      display: none;
    }
    ${HeroLogo} {
      opacity: 0.15;
    }
  }
`
