import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { PlainLink } from 'components/Link'
import { OUTLINE_SIZE } from 'components/TabAccess'
import { URLS } from 'consts'
import { IconWithText } from 'components/Icon'

const LINK_SPACING = '3rem'
const ICON_SPACING = '1rem'

const Wrapper = styled.ul`
  margin-left: -${LINK_SPACING};
  display: flex;
`

const Link = styled(PlainLink)`
  margin-left: ${LINK_SPACING};
  margin-right: -${OUTLINE_SIZE};
  padding: 0.6rem ${OUTLINE_SIZE};
  outline-offset: -${OUTLINE_SIZE};
  color: var(--text-low-contrast);
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
