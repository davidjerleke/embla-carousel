import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useNavigation, useRouteActive } from 'hooks'
import { RouteType } from 'components/Routes'
import { PlainLink } from 'components/Link'
import { gradientTextStyles } from 'utils'

const Wrapper = styled(PlainLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const InactiveText = styled.span<{ $isActive: boolean }>`
  color: var(--text-medium-contrast);
  opacity: ${({ $isActive }) => ($isActive ? 0 : 1)};
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`

const ActiveText = styled.span<{ $isActive: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  font-weight: 500;
  ${gradientTextStyles};
`

type PropType = PropsWithChildren<{
  route: RouteType
  isActive?: boolean
}>

export const NavigationLink = (props: PropType) => {
  const { route, isActive, children, ...restProps } = props
  const { isPartiallyActive } = useRouteActive(route)
  const { closeNavigation } = useNavigation()
  const active = isActive ?? isPartiallyActive

  return (
    <Wrapper to={route.slug} onClick={closeNavigation} {...restProps}>
      <InactiveText $isActive={active}>{children}</InactiveText>
      <ActiveText $isActive={active} aria-hidden="true">
        {children}
      </ActiveText>
    </Wrapper>
  )
}
