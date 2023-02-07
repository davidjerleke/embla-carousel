import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useRouteActive } from 'hooks/useRouteActive'
import { RouteType } from 'components/Routes/Context'
import { PlainLink } from 'components/Link/PlainLink'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { COLORS } from 'consts/themes'

const Wrapper = styled(PlainLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
`

const InactiveText = styled.span<{ $isActive: boolean }>`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
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
  slug: RouteType['slug']
  isActive?: boolean
}>

export const NavigationLink = (props: PropType) => {
  const { slug, isActive, children, ...restProps } = props
  const { isPartiallyActive } = useRouteActive(slug)
  const active = isActive ?? isPartiallyActive

  return (
    <Wrapper to={slug} {...restProps}>
      <InactiveText $isActive={active}>{children}</InactiveText>
      <ActiveText $isActive={active} aria-hidden="true">
        {children}
      </ActiveText>
    </Wrapper>
  )
}
