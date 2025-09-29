import React, { PropsWithChildren, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { setRoutesLoading } from 'components/Routes/routesReducer'
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'
import { GatsbyLinkProps, Link } from 'gatsby'
import { TAP_HIGHLIGHT_STYLES } from 'consts/tapHighlight'
import { KEY_NAVIGATING_STYLES } from 'consts/keyEvents'
import { setModalClosed } from 'components/Modal/modalReducer'
import { MODALS } from 'consts/modal'

const INTERNAL_LINK_REGEX = /^\/(?!\/)|^#/

export const linkBareStyles = css<{ $isKeyNavigating: boolean }>`
  ${KEY_NAVIGATING_STYLES};
  ${TAP_HIGHLIGHT_STYLES};
  text-decoration: none;
  touch-action: manipulation;
`

const InternalLink = styled(Link)`
  ${linkBareStyles};
`

const ExternalLink = styled.a`
  ${linkBareStyles};
`

export type PropType = PropsWithChildren<{
  to: string
  ariaLabel?: string
  tabIndex?: number
  id?: GatsbyLinkProps<{}>['id']
  onClick?: GatsbyLinkProps<{}>['onClick']
}>

export const LinkBare = (props: PropType) => {
  const { to, id, ariaLabel, tabIndex, children, onClick, ...restProps } = props
  const linkElement = useRef<HTMLAnchorElement | null>(null)
  const isInternal = INTERNAL_LINK_REGEX.test(to)
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const closeNavigation = useCallback(() => {
    dispatch(setModalClosed(MODALS.SITE_NAVIGATION))
  }, [dispatch])

  const onClickInternalLink = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onClick) onClick(event)

      if (!linkElement.current) {
        linkElement.current = document.createElement('a')
      }

      linkElement.current.href = to
      const targetIsCurrentUrl = pathname === linkElement.current.pathname
      const isNewTabClick = event.metaKey || event.ctrlKey

      if (!targetIsCurrentUrl && !isNewTabClick) {
        dispatch(setRoutesLoading(true))
        return
      }

      if (linkElement.current.hash) {
        setTimeout(() => closeNavigation(), 0)
      } else {
        closeNavigation()
      }
    },
    [pathname, to, closeNavigation, dispatch, onClick]
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
