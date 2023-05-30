import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { LinkBare } from 'components/Link/LinkBare'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { IconWithText } from 'components/Icon/IconWithText'
import { BORDER_SIZES } from 'consts/border'
import { createGapStyles } from 'utils/createGapStyles'

const LINK_SPACING = SPACINGS.FIVE
const ICON_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)

const FooterLinksWrapper = styled.ul`
  ${createGapStyles(LINK_SPACING, '', 'li')};
  display: flex;
`

const Link = styled(LinkBare)`
  margin-right: -${BORDER_SIZES.OUTLINE};
  padding: ${SPACINGS.ONE} ${BORDER_SIZES.OUTLINE};
  outline-offset: -${BORDER_SIZES.OUTLINE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  display: inline-flex;
  align-items: center;
`

type PropType = PropsWithChildren<{}>

export const FooterLinks = (props: PropType) => {
  const { ...restProps } = props

  return (
    <FooterLinksWrapper {...restProps}>
      <li>
        <Link to={URLS.NPM_PACKAGE}>
          <IconWithText iconSvg="npm" spacing={ICON_SPACING}>
            Npm
          </IconWithText>
        </Link>
      </li>
      <li>
        <Link to={URLS.GITHUB_ROOT}>
          <IconWithText iconSvg="github" spacing={ICON_SPACING}>
            GitHub
          </IconWithText>
        </Link>
      </li>
    </FooterLinksWrapper>
  )
}
