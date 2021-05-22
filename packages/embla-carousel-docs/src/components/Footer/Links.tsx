import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { NpmIcon, GithubIcon } from 'assets/icons'
import { PlainLink } from 'components/Link'
import { OUTLINE_SIZE } from 'components/TabAccess'
import { createSquareSizeStyles } from 'utils'
import { URLS } from 'consts'

const ITEM_SPACING = '3rem'

const Wrapper = styled.ul`
  margin-left: -${ITEM_SPACING};
  display: flex;
`

const Link = styled(PlainLink)`
  margin-left: ${ITEM_SPACING};
  margin-right: -${OUTLINE_SIZE};
  padding: 0.6rem ${OUTLINE_SIZE};
  outline-offset: -${OUTLINE_SIZE};
  color: var(--text-medium-contrast);
  display: inline-flex;
  align-items: center;
`

const linkSvgStyles = css`
  color: var(--detail-high-contrast);
  ${createSquareSizeStyles('1.8rem')}
  margin-right: 1rem;
  margin-left: -${OUTLINE_SIZE};
`

const NpmSvg = styled(NpmIcon)`
  ${linkSvgStyles};
`

const GithubSvg = styled(GithubIcon)`
  ${linkSvgStyles};
`

type PropType = PropsWithChildren<{}>

export const Links = (props: PropType) => {
  const { ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <li>
        <Link to={URLS.NPM_PACKAGE}>
          <NpmSvg aria-hidden="true" focusable="false" />
          <span>Npm</span>
        </Link>
      </li>
      <li>
        <Link to={URLS.LIBRARY_REPOSITORY}>
          <GithubSvg aria-hidden="true" focusable="false" />
          <span>GitHub</span>
        </Link>
      </li>
    </Wrapper>
  )
}
