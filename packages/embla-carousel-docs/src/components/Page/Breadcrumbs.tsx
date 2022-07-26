import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { PlainLink } from 'components/Link'
import { useRouteBreadcrumbs } from 'hooks'
import { Icon } from 'components/Icon'
import { COLORS, SPACINGS } from 'consts'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: ${SPACINGS.THREE};
`

const itemStyles = css`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding: ${SPACINGS.ONE} 0;
`

const Link = styled(PlainLink)`
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

export const Breadcrumbs = (props: PropType) => {
  const { id } = props
  const breadcrumbs = useRouteBreadcrumbs(id)

  if (breadcrumbs.length === 0) return null

  return (
    <Wrapper aria-label="Breadcrumb Navigation">
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
        ),
      )}
    </Wrapper>
  )
}
