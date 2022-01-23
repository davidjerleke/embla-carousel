import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { PlainLink } from 'components/Link'
import { useRouteBreadcrumbs } from 'hooks'
import { Icon } from 'components/Icon'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: 1.8rem;
`

const itemStyles = css`
  color: var(--text-low-contrast);
  padding: 0.6rem 0;
`

const Link = styled(PlainLink)`
  ${itemStyles};
`

const ActiveTitle = styled.span`
  ${itemStyles};
`

const Separator = styled(Icon)`
  color: var(--text-low-contrast);
  margin: 0 0.6rem;
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
