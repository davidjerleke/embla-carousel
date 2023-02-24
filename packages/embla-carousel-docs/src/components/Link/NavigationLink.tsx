import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useRouteActive } from 'hooks/useRouteActive'
import { RouteType } from 'components/Routes/RoutesContext'
import { BareLink } from 'components/Link/BareLink'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { COLORS } from 'consts/themes'

const NavigationLinkWrapper = styled(BareLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const InactiveText = styled.span<{ $isActive: boolean }>`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`

export const ActiveText = styled.span<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  font-weight: 500;
  ${gradientTextStyles};
`

type PropType = PropsWithChildren<{
  slug: RouteType['slug']
  isActive?: boolean
}>

export const NavigationLink = (props: PropType) => {
  const { slug, isActive, children, ...restProps } = props
  const { isPartiallyActive } = useRouteActive(slug)
  const active = isActive ?? isPartiallyActive

  return (
    <NavigationLinkWrapper to={slug} {...restProps}>
      <InactiveText $isActive={active}>{children}</InactiveText>
      <ActiveText $isActive={active} aria-hidden="true">
        {children}
      </ActiveText>
    </NavigationLinkWrapper>
  )
}
