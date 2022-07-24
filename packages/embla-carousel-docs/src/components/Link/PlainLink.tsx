import React, { PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { GatsbyLinkProps, Link } from 'gatsby'
import { tabAccessStyles } from 'components/TabAccess'
import { useTabAccess } from 'hooks'
import { COLORS } from 'consts'

export const plainLinkStyles = css<{ $isTabbing: boolean }>`
  ${tabAccessStyles};
  -webkit-tap-highlight-color: rgba(
    ${COLORS.TEXT_HIGH_CONTRAST_RGB_VALUE},
    0.5
  );

  text-decoration: none;
`

const InternalLink = styled(Link)`
  ${plainLinkStyles};
`

const ExternalLink = styled.a`
  ${plainLinkStyles};
`

export type PropType = PropsWithChildren<{
  to: string
  ariaLabel?: string
  tabIndex?: number
  id?: GatsbyLinkProps<{}>['id']
  onClick?: GatsbyLinkProps<{}>['onClick']
}>

export const PlainLink = (props: PropType) => {
  const { to, id, ariaLabel, tabIndex, children, onClick, ...restProps } = props
  const isInternal = /^\/(?!\/)|^#/.test(to)
  const isTabbing = useTabAccess()

  if (isInternal) {
    return (
      <InternalLink
        to={to}
        id={id}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        onClick={onClick}
        $isTabbing={isTabbing}
        {...restProps}
      >
        {children}
      </InternalLink>
    )
  }

  return (
    <ExternalLink
      href={to}
      id={id}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={onClick}
      $isTabbing={isTabbing}
      target="_blank"
      rel="noreferrer"
      {...restProps}
    >
      {children}
    </ExternalLink>
  )
}
