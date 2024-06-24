import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import logoLightThemeDefaultUrl from 'assets/images/embla-logo-light-theme.svg'
import logoDarkThemeDefaultUrl from 'assets/images/embla-logo-dark-theme.svg'
import logoLightThemeBlurUrl from 'assets/images/embla-logo-light-theme-blur.svg'
import logoDarkThemeBlurUrl from 'assets/images/embla-logo-dark-theme-blur.svg'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
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
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  z-index: ${LAYERS.STEP};
`

const imageIconStyles = css<{ $opacity: string }>`
  opacity: ${({ $opacity }) => $opacity};
  transition: opacity 1s;
`

export const LogoLightImage = styled.img`
  ${imageStyles};
`

export const LogoDarkImage = styled.img`
  ${imageStyles};
`

export const LogoLightIcon = styled(Icon)`
  ${imageStyles};
  ${imageIconStyles};
`

export const LogoDarkIcon = styled(Icon)`
  ${imageStyles};
  ${imageIconStyles};
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
  const { title } = useSiteMetadata()
  const [hasLoaded, setHasLoaded] = useState(false)
  const appearance = props.appearance || 'default'
  const lightSvg = LOGO_SVGS[appearance].light
  const darkSvg = LOGO_SVGS[appearance].dark
  const svgOpacity = hasLoaded ? '0' : '1'
  const imageLightRef = useRef<HTMLImageElement>(null)
  const imageDarkRef = useRef<HTMLImageElement>(null)
  const alt = `An illustrated atom like body which is the logotype of ${title}`

  useEffect(() => {
    const imageLight = imageLightRef.current
    const imageDark = imageDarkRef.current
    const imagesHaveLoaded = imageLight?.complete && imageDark?.complete

    if (imagesHaveLoaded) setHasLoaded(true)
  }, [])

  return (
    <SiteLogoWrapper {...props}>
      <LogoLightIcon svg={lightSvg} fill={undefined} $opacity={svgOpacity} />
      <LogoDarkIcon svg={darkSvg} fill={undefined} $opacity={svgOpacity} />

      <LogoLightImage
        ref={imageLightRef}
        src={LOGO_IMAGES[appearance].light}
        alt={alt}
        onLoad={() => setHasLoaded(true)}
      />
      <LogoDarkImage
        ref={imageDarkRef}
        src={LOGO_IMAGES[appearance].dark}
        alt={alt}
        onLoad={() => setHasLoaded(true)}
      />
    </SiteLogoWrapper>
  )
}
