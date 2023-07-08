import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { useRouteActive } from 'hooks/useRouteActive'
import { RouteType } from 'components/Routes/RoutesContext'
import { LinkBare } from 'components/Link/LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS } from 'consts/themes'

const LinkNavigationWrapper = styled(LinkBare)`
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
  font-weight: ${FONT_WEIGHTS.MEDIUM};
  ${BRAND_GRADIENT_TEXT_STYLES};
`

type PropType = PropsWithChildren<{
  slug: RouteType['slug']
  isActive?: boolean
}>

export const LinkNavigation = (props: PropType) => {
  const { slug, isActive, children, ...restProps } = props
  const { isPartiallyActive } = useRouteActive(slug)
  const active = isActive ?? isPartiallyActive

  return (
    <LinkNavigationWrapper to={slug} {...restProps}>
      <InactiveText $isActive={active}>{children}</InactiveText>
      <ActiveText $isActive={active} aria-hidden="true">
        {children}
      </ActiveText>
    </LinkNavigationWrapper>
  )
}
