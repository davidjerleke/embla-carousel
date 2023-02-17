import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'
import { GatsbyLinkProps, Link } from 'gatsby'
import { keyNavigatingStyles } from 'components/KeyNavigating/keyNavigatingStyles'
import { useNavigation } from 'hooks/useNavigation'
import { useRoutes } from 'hooks/useRoutes'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { COLORS } from 'consts/themes'

export const plainLinkStyles = css<{ $isKeyNavigating: boolean }>`
  ${keyNavigatingStyles};
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
  const linkElement = useRef<HTMLAnchorElement | null>(null)
  const isInternal = /^\/(?!\/)|^#/.test(to)
  const { isKeyNavigating } = useKeyNavigating()
  const { pathname } = useLocation()
  const { setIsLoading } = useRoutes()
  const { closeNavigation } = useNavigation()

  const onClickInternalLink = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) onClick(event)

      if (!linkElement.current) {
        linkElement.current = document.createElement('a')
      }

      linkElement.current.href = to
      const targetIsCurrentUrl = pathname === linkElement.current.pathname

      if (targetIsCurrentUrl) {
        closeNavigation()
      } else {
        setIsLoading(true)
      }
    },
    [pathname, to, closeNavigation, setIsLoading, onClick],
  )

  if (isInternal) {
    return (
      <InternalLink
        to={to}
        id={id}
        aria-label={ariaLabel}
        tabIndex={tabIndex}
        onClick={onClickInternalLink}
        $isKeyNavigating={isKeyNavigating}
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
      $isKeyNavigating={isKeyNavigating}
      target="_blank"
      rel="noreferrer"
      {...restProps}
    >
      {children}
    </ExternalLink>
  )
}
