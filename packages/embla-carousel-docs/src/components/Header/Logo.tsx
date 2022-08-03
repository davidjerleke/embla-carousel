import React from 'react'
import styled from 'styled-components'
import { createSquareSizeStyles } from 'utils'
import { useSiteMetadata } from 'hooks'
import { MEDIA, COLORS, SPACINGS, FONT_SIZES } from 'consts'
import { PlainLink } from 'components/Link'
import { SiteLogo } from 'components/SiteLogo'

const Wrapper = styled(PlainLink)`
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  font-size: ${FONT_SIZES.H4};
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: 900;

  ${MEDIA.MIN_XXS} {
    font-size: ${FONT_SIZES.CUSTOM(({ H4 }) => H4 + 0.2)};
  }
`

const HeaderLogo = styled(SiteLogo)`
  ${createSquareSizeStyles('2.8rem')};
  margin-right: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  display: flex;

  ${MEDIA.MIN_XXS} {
    ${createSquareSizeStyles('3rem')};
  }

  > img {
    ${createSquareSizeStyles('100%')};
  }
`

export const Logo = () => {
  const { title } = useSiteMetadata()

  return (
    <Wrapper aria-label="Permalink to home page" to="/">
      <HeaderLogo />
      <span>{title}</span>
    </Wrapper>
  )
}
