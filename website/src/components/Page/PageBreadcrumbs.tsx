'use client'

import { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { LinkBare } from '@/components/Link/LinkBare'
import { useRouteBreadcrumbs } from '@/hooks/routes'
import { Icon } from '@/components/Icon/Icon'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES } from '@/utils/font-sizes'
import { SPACINGS } from '@/utils/spacings'
import { arrayHasItems } from '@/utils/array'
import { LAYERS } from '@/utils/layers'
import { KeyNavigatingPropType } from '@/utils/key-events'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { useAppSelector } from '@/hooks/redux'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import {
  createScrollBarShadowStyles,
  createScrollBarStyles,
  SCROLL_BAR_SHADOW_SIZE
} from '@/utils/scrollbars'

const PageBreadcrumbsWrapper = styled.nav<KeyNavigatingPropType>`
  width: calc(100% + ${PAGE_FRAME_SPACING} * 2);
  margin-left: -${PAGE_FRAME_SPACING};
  margin-right: -${PAGE_FRAME_SPACING};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.THREE};
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    position: absolute;
    z-index: ${LAYERS.STEP};
    top: -${PAGE_FRAME_SPACING};
    bottom: -${PAGE_FRAME_SPACING};
    content: '';
  }

  &:before {
    ${createScrollBarShadowStyles('left')};
    left: -${SCROLL_BAR_SHADOW_SIZE};
  }

  &:after {
    ${createScrollBarShadowStyles('right')};
    right: -${SCROLL_BAR_SHADOW_SIZE};
  }
`

const ScrollArea = styled.div`
  ${createScrollBarStyles('x')};
  overflow-x: scroll;
  display: flex;
  align-items: center;

  padding-left: ${PAGE_FRAME_SPACING};
  padding-right: ${PAGE_FRAME_SPACING};
`

const itemStyles = css`
  flex: 0 0 auto;
  min-width: 0;
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding: ${SPACINGS.ONE} 0;
`

const Link = styled(LinkBare)`
  ${itemStyles};
`

const ActiveTitle = styled.span`
  ${itemStyles};
  color: ${COLORS.TEXT_BODY};
`

const Separator = styled(Icon)`
  flex: 0 0 auto;
  color: ${COLORS.TEXT_LOW_CONTRAST};
  margin: 0 ${SPACINGS.ONE};
`

export function PageBreadcrumbs() {
  const breadcrumbs = useRouteBreadcrumbs()
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  if (!arrayHasItems(breadcrumbs)) return null

  return (
    <PageBreadcrumbsWrapper
      aria-label="Breadcrumb Navigation"
      $isKeyNavigating={isKeyNavigating}
    >
      <ScrollArea>
        {breadcrumbs.map(({ slug, title }, index) =>
          index !== breadcrumbs.length - 1 ? (
            <Fragment key={slug}>
              <Link href={slug}>{title}</Link>
              <Separator
                size="0.8rem"
                svg="chevronRight"
                role="presentation"
                aria-hidden="false"
              />
            </Fragment>
          ) : (
            <ActiveTitle key={slug}>{title}</ActiveTitle>
          )
        )}
      </ScrollArea>
    </PageBreadcrumbsWrapper>
  )
}
