import React from 'react'
import styled from 'styled-components'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { MEDIA } from 'consts/breakpoints'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { BORDER_SIZES } from 'consts/border'
import { LinkBare } from 'components/Link/LinkBare'
import {
  LogoDarkIcon,
  LogoImage,
  LogoLightIcon,
  SiteLogo
} from 'components/SiteLogo/SiteLogo'

const HeaderLogoWrapper = styled(LinkBare)`
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  font-size: ${FONT_SIZES.H4};
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: ${FONT_WEIGHTS.BLACK};

  ${MEDIA.MIN_XXS} {
    font-size: ${FONT_SIZES.CUSTOM(({ H4 }) => H4 + 0.2)};
  }
`

const HeaderLogoImage = styled(SiteLogo)`
  ${createSquareSizeStyles('4rem')};
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  border-radius: 50%;
  margin-right: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  display: flex;

  ${MEDIA.MIN_XXS} {
    ${createSquareSizeStyles('4.4rem')};
  }

  > ${LogoImage}, > ${LogoLightIcon}, > ${LogoDarkIcon} {
    ${createSquareSizeStyles('100%')};
    padding: ${SPACINGS.ONE};
  }
`

export const HeaderLogo = () => {
  const { title } = useSiteMetadata()

  return (
    <HeaderLogoWrapper aria-label="Permalink to home page" to="/">
      <HeaderLogoImage />
      <span>{title}</span>
    </HeaderLogoWrapper>
  )
}
