import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { PlainLink } from 'components/Link/PlainLink'
import { OUTLINE_SIZE } from 'components/TabAccess/tabAccessStyles'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { IconWithText } from 'components/Icon/IconWithText'

const LINK_SPACING = SPACINGS.FIVE
const ICON_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)

const Wrapper = styled.ul`
  margin-left: -${LINK_SPACING};
  display: flex;
`

const Link = styled(PlainLink)`
  margin-left: ${LINK_SPACING};
  margin-right: -${OUTLINE_SIZE};
  padding: ${SPACINGS.ONE} ${OUTLINE_SIZE};
  outline-offset: -${OUTLINE_SIZE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  display: inline-flex;
  align-items: center;
`

type PropType = PropsWithChildren<{}>

export const Links = (props: PropType) => {
  const { ...restProps } = props

  return (
    <Wrapper {...restProps}>
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
    </Wrapper>
  )
}
