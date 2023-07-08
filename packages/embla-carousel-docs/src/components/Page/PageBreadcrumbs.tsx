import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { LinkBare } from 'components/Link/LinkBare'
import { useRouteBreadcrumbs } from 'hooks/useRouteBreadcrumbs'
import { Icon } from 'components/Icon/Icon'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { SPACINGS } from 'consts/spacings'

const PageBreadcrumbsWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.THREE};
`

const itemStyles = css`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding: ${SPACINGS.ONE} 0;
`

const Link = styled(LinkBare)`
  ${itemStyles};
`

const ActiveTitle = styled.span`
  ${itemStyles};
`

const Separator = styled(Icon)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  margin: 0 ${SPACINGS.ONE};
`

type PropType = { id: string }

export const PageBreadcrumbs = (props: PropType) => {
  const { id } = props
  const breadcrumbs = useRouteBreadcrumbs(id)

  if (breadcrumbs.length === 0) return null

  return (
    <PageBreadcrumbsWrapper aria-label="Breadcrumb Navigation">
      {breadcrumbs.map(({ id, slug, title }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <Fragment key={id}>
            <Link to={slug}>{title}</Link>
            <Separator
              size="0.6rem"
              svg="chevronRight"
              role="presentation"
              aria-hidden="false"
            />
          </Fragment>
        ) : (
          <ActiveTitle key={id}>{title}</ActiveTitle>
        )
      )}
    </PageBreadcrumbsWrapper>
  )
}
