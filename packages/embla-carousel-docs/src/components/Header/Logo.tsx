import React from 'react'
import styled from 'styled-components'
import { createSquareSizeStyles } from 'utils'
import { useNavigation, useSiteMetadata } from 'hooks'
import { MEDIA, cssHackStyles, COLORS } from 'consts'
import { PlainLink } from 'components/Link'
import { SiteLogo } from 'components/SiteLogo'

const Wrapper = styled(PlainLink)`
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: 900;
  font-size: 1.8rem;

  ${MEDIA.MIN_XXS} {
    font-size: 2rem;
  }

  ${cssHackStyles.firefoxAll} {
    font-weight: 1000;
  }
`

const HeaderLogo = styled(SiteLogo)`
  ${createSquareSizeStyles('2.8rem')};
  display: flex;
  margin-right: 0.8rem;

  ${MEDIA.MIN_XXS} {
    ${createSquareSizeStyles('3rem')};
  }

  > img {
    ${createSquareSizeStyles('100%')};
  }
`

export const Logo = () => {
  const { closeNavigation } = useNavigation()
  const { title } = useSiteMetadata()

  return (
    <Wrapper
      aria-label="Permalink to home page"
      onClick={closeNavigation}
      to="/"
    >
      <HeaderLogo />
      <span>{title}</span>
    </Wrapper>
  )
}
