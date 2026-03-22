import styled from 'styled-components'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { MEDIA } from '@/utils/breakpoints'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { BORDER_SIZES } from '@/utils/border'
import { LinkBare } from '@/components/Link/LinkBare'
import { GLOBAL_DATA } from '@/utils/global-data'
import { useHeaderNavigationContext } from '@/components/Header/HeaderNavigationContext'
import {
  LogoDarkIcon,
  LogoDarkImage,
  LogoLightIcon,
  LogoLightImage,
  SiteLogo
} from '@/components/SiteLogo/SiteLogo'

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
  margin-right: ${SPACINGS.CUSTOM(({ ONE }) => ONE)};
  display: flex;

  ${MEDIA.MIN_XXS} {
    ${createSquareSizeStyles('4.4rem')};
  }

  > ${LogoLightImage},
    > ${LogoDarkImage},
    > ${LogoLightIcon},
    > ${LogoDarkIcon} {
    ${createSquareSizeStyles('100%')};
    padding: ${SPACINGS.ONE};
  }
`

const HeaderLogoText = styled.span`
  display: flex;
`

export function HeaderLogo() {
  const { TITLE } = GLOBAL_DATA
  const { homeRoute } = useHeaderNavigationContext()

  return (
    <HeaderLogoWrapper
      aria-label="Permalink to home page"
      href={homeRoute.slug}
    >
      <HeaderLogoImage />
      <HeaderLogoText>{TITLE}</HeaderLogoText>
    </HeaderLogoWrapper>
  )
}
