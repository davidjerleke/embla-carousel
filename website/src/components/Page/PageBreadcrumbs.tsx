// import { Fragment } from 'react'
import styled, { css } from 'styled-components'
// import { LinkBare } from '@/components/Link/LinkBare'
import { useRouteBreadcrumbs } from '@/hooks/routes'
// import { Icon } from '@/components/Icon/Icon'
// import { COLORS } from '@/utils/theme'
import { FONT_SIZES } from '@/utils/font-sizes'
import { SPACINGS } from '@/utils/spacings'

const PageBreadcrumbsWrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.THREE};
`

// TODO: Fix breadcrumbs!

// const itemStyles = css`
//   color: ${COLORS.TEXT_LOW_CONTRAST};
//   padding: ${SPACINGS.ONE} 0;
// `

// const Link = styled(LinkBare)`
//   ${itemStyles};
// `

// const ActiveTitle = styled.span`
//   ${itemStyles};
//   color: ${COLORS.TEXT_BODY};
// `

// const Separator = styled(Icon)`
//   color: ${COLORS.TEXT_LOW_CONTRAST};
//   margin: 0 ${SPACINGS.ONE};
// `

type PropType = { id: string }

export function PageBreadcrumbs(props: PropType) {
  const { id } = props
  const breadcrumbs = useRouteBreadcrumbs(id)

  if (breadcrumbs.length === 0) return null

  return (
    <PageBreadcrumbsWrapper aria-label="Breadcrumb Navigation">
      {/* {breadcrumbs.map(({ id, slug, title }, index) =>
        index !== breadcrumbs.length - 1 ? (
          <Fragment key={id}>
            <Link href={slug}>{title}</Link>
            <Separator
              size="0.8rem"
              svg="chevronRight"
              role="presentation"
              aria-hidden="false"
            />
          </Fragment>
        ) : (
          <ActiveTitle key={id}>{title}</ActiveTitle>
        )
      )} */}
    </PageBreadcrumbsWrapper>
  )
}
