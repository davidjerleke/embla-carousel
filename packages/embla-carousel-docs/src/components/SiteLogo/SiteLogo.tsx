import React, { PropsWithChildren, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import logoLightThemeUrl from 'assets/images/embla-logo-light-theme.svg'
import logoDarkThemeUrl from 'assets/images/embla-logo-dark-theme.svg'
import { useInView } from 'react-intersection-observer'
import { EmblaLightIcon, EmblaDarkIcon } from 'assets/icons'
import { useSiteMetadata, useTheme } from 'hooks'
import { LAYERS, THEME_KEYS } from 'consts'

const logoStyles = css`
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  ${logoStyles};
  position: relative;
  width: 100%;
  height: 100%;
`

const svgStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const LogoImage = styled.img`
  ${logoStyles};
  position: relative;
  z-index: ${LAYERS.STEP};
`

export const LogoLightIcon = styled(EmblaLightIcon)`
  ${svgStyles};
`

export const LogoDarkIcon = styled(EmblaDarkIcon)`
  ${svgStyles};
`

const LOGO_IMAGES = {
  [THEME_KEYS.LIGHT]: logoLightThemeUrl as unknown as string,
  [THEME_KEYS.DARK]: logoDarkThemeUrl as unknown as string,
}

type PropType = PropsWithChildren<{}>

export const SiteLogo = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })
  const [hasLoaded, setHasLoaded] = useState(false)
  const { theme } = useTheme()
  const { title } = useSiteMetadata()
  const { src, alt } = useMemo(
    () => ({
      src: LOGO_IMAGES[theme],
      alt: `An illustrated atom like body which is the logotype of ${title}`,
    }),
    [theme, title],
  )

  return (
    <Wrapper ref={inViewRef} {...props}>
      {!hasLoaded && (
        <>
          <LogoLightIcon aria-hidden="true" focusable="false" />
          <LogoDarkIcon aria-hidden="true" focusable="false" />
        </>
      )}
      {inView && (
        <LogoImage src={src} alt={alt} onLoad={() => setHasLoaded(true)} />
      )}
    </Wrapper>
  )
}
