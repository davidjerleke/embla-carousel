import React from 'react'
import { useRouteChildren } from 'hooks/useRoutes'
import { useRouteCurrent } from 'hooks/useRoutes'
import { LinkCard } from 'components/Link/LinkCard'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import styled from 'styled-components'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { COLORS } from 'consts/themes'
import { createGapStyles } from 'utils/createGapStyles'

const USP_ITEM_SPACING = SPACINGS.CUSTOM(() => 1.4)

const PageChildLinksWrapper = styled.ul`
  ${createGapStyles(USP_ITEM_SPACING, USP_ITEM_SPACING, 'li')};
  display: flex;
  flex-wrap: wrap;
`

const Item = styled.li`
  flex: 0 0 100%;
  min-width: 0;

  ${MEDIA.MIN_XS} {
    flex: 0 0 calc(100% / 2);
  }

  ${MEDIA.MIN_SM} {
    flex: 0 0 calc(100% / 2);
  }
`

const UspHeader = styled.h3`
  color: ${COLORS.TEXT_BODY};
  margin-top: 0;
  margin-bottom: ${SPACINGS.CUSTOM(() => 0.8)};
  font-size: ${FONT_SIZES.H4};
  font-weight: ${FONT_WEIGHTS.BOLD};
`

const UspText = styled.p`
  margin-bottom: ${SPACINGS.THREE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const PageChildLinks = () => {
  const routeChildren = useRouteChildren(useRouteCurrent())

  if (routeChildren.length === 0) return null

  return (
    <div>
      <PageChildLinksWrapper>
        {routeChildren.map(({ id, slug, title, description }) => (
          <Item key={id}>
            <LinkCard to={slug}>
              <div>
                <UspHeader>{title}</UspHeader>
                <UspText>{description}</UspText>
              </div>
            </LinkCard>
          </Item>
        ))}
      </PageChildLinksWrapper>
    </div>
  )
}
