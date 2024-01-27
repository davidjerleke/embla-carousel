import React, { PropsWithChildren, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import logoLightThemeDefaultUrl from 'assets/images/embla-logo-light-theme.svg'
import logoDarkThemeDefaultUrl from 'assets/images/embla-logo-dark-theme.svg'
import logoLightThemeBlurUrl from 'assets/images/embla-logo-light-theme-blur.svg'
import logoDarkThemeBlurUrl from 'assets/images/embla-logo-dark-theme-blur.svg'
import { useInView } from 'react-intersection-observer'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { useTheme } from 'hooks/useTheme'
import { THEME_KEYS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { Icon } from 'components/Icon/Icon'

const SiteLogoWrapper = styled.div`
  width: 100%;
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
`

const imageStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: ${LAYERS.STEP};
`

export const LogoImage = styled.img`
  ${imageStyles};
`

export const LogoLightIcon = styled(Icon)`
  ${imageStyles};
`

export const LogoDarkIcon = styled(Icon)`
  ${imageStyles};
`

type LogoImagesType = {
  default: {
    light: string
    dark: string
  }
  blur: {
    light: string
    dark: string
  }
}

const LOGO_IMAGES: LogoImagesType = {
  default: {
    [THEME_KEYS.LIGHT]: logoLightThemeDefaultUrl,
    [THEME_KEYS.DARK]: logoDarkThemeDefaultUrl
  },
  blur: {
    [THEME_KEYS.LIGHT]: logoLightThemeBlurUrl,
    [THEME_KEYS.DARK]: logoDarkThemeBlurUrl
  }
}

type LogoSvgsType = {
  default: {
    light: 'emblaLightDefault'
    dark: 'emblaDarkDefault'
  }
  blur: {
    light: 'emblaLightBlur'
    dark: 'emblaDarkBlur'
  }
}

const LOGO_SVGS: LogoSvgsType = {
  default: {
    [THEME_KEYS.LIGHT]: 'emblaLightDefault',
    [THEME_KEYS.DARK]: 'emblaDarkDefault'
  },
  blur: {
    [THEME_KEYS.LIGHT]: 'emblaLightBlur',
    [THEME_KEYS.DARK]: 'emblaDarkBlur'
  }
}

type PropType = PropsWithChildren<{
  appearance?: keyof typeof LOGO_IMAGES
}>

export const SiteLogo = (props: PropType) => {
  const { appearance = 'default' } = props
  const [inViewRef, inView] = useInView({ triggerOnce: true })
  const [hasLoaded, setHasLoaded] = useState(false)
  const { theme } = useTheme()
  const { title } = useSiteMetadata()
  const lightSvg = LOGO_SVGS[appearance].light
  const darkSvg = LOGO_SVGS[appearance].dark

  const { src, alt } = useMemo(
    () => ({
      src: LOGO_IMAGES[appearance][theme],
      alt: `An illustrated atom like body which is the logotype of ${title}`
    }),
    [theme, appearance, title]
  )

  return (
    <SiteLogoWrapper ref={inViewRef} {...props}>
      {!hasLoaded && (
        <>
          <LogoLightIcon svg={lightSvg} fill={undefined} />
          <LogoDarkIcon svg={darkSvg} fill={undefined} />
        </>
      )}
      {inView && (
        <LogoImage src={src} alt={alt} onLoad={() => setHasLoaded(true)} />
      )}
    </SiteLogoWrapper>
  )
}
