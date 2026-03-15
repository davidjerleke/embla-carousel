'use client'

import React, { useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import styled, { css } from 'styled-components'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { TAP_HIGHLIGHT_STYLES } from '@/utils/tap-highlight'
import { KEY_NAVIGATING_STYLES } from '@/utils/key-events'
import { setModalClosed } from '@/components/Modal/modal-reducer'
import { setRoutesLoading } from '@/components/Routes/routes-reducer'
import { isInternalLink } from '@/utils/link'
import { scrollToHash } from '@/utils/scroll-to-hash'

export const linkBareStyles = css<{ $isKeyNavigating: boolean }>`
  ${KEY_NAVIGATING_STYLES};
  ${TAP_HIGHLIGHT_STYLES};
  text-decoration: none;
  touch-action: manipulation;
`

const InternalLink = styled(Link)<{ $isKeyNavigating: boolean }>`
  ${linkBareStyles};
`

const ExternalLink = styled.a<{ $isKeyNavigating: boolean }>`
  ${linkBareStyles};
`

export type PropType = React.ComponentProps<typeof Link>

export function LinkBare(props: PropType) {
  const { href, id, tabIndex, children, onClick, ...restProps } = props
  const to = typeof href === 'string' ? href : href?.pathname || ''
  const linkElement = useRef<HTMLAnchorElement | null>(null)
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const closeNavigation = useCallback(() => {
    dispatch(setModalClosed())
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
        scrollToHash(linkElement.current.hash)
      } else {
        closeNavigation()
      }
    },
    [pathname, to, closeNavigation, dispatch, onClick]
  )

  if (isInternalLink(to)) {
    return (
      <InternalLink
        href={to}
        id={id}
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
      tabIndex={tabIndex}
      $isKeyNavigating={isKeyNavigating}
      target="_blank"
      rel="noreferrer"
      {...restProps}
    >
      {children}
    </ExternalLink>
  )
}
