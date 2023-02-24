import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { BareLink } from 'components/Link/BareLink'
import { OUTLINE_SIZE } from 'components/KeyNavigating/keyNavigatingStyles'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { IconWithText } from 'components/Icon/IconWithText'

const LINK_SPACING = SPACINGS.FIVE
const ICON_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)

const FooterLinksWrapper = styled.ul`
  margin-left: -${LINK_SPACING};
  display: flex;
`

const Link = styled(BareLink)`
  margin-left: ${LINK_SPACING};
  margin-right: -${OUTLINE_SIZE};
  padding: ${SPACINGS.ONE} ${OUTLINE_SIZE};
  outline-offset: -${OUTLINE_SIZE};
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
