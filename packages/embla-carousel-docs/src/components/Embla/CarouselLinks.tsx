import React from 'react'
import styled from 'styled-components'
import { PenIcon } from 'assets/icons'
import { ContentLink } from 'components/Link'
import { createSquareSizeStyles } from 'utils'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -2.2rem;
  margin-bottom: 1.2rem;
  margin-left: -1.2rem;
`

const Item = styled.div`
  color: var(--text-low-contrast);
  display: flex;
  align-items: center;
  padding-left: 1.4rem;
  font-size: 1.4rem;
`

const PenSvg = styled(PenIcon)`
  ${createSquareSizeStyles('1.5rem')};
  margin-right: 0.6rem;
`

const Link = styled(ContentLink)`
  padding: 0.6rem 0;
  border: none;
`

type PropType = { links: { label: string; to: string }[] }

export const CarouselLinks = (props: PropType) => {
  const { links = [] } = props

  return (
    <Wrapper>
      <Item>
        <PenSvg aria-hidden="true" focusable="false" />
        <span>Edit code:</span>
      </Item>
      {links.map(({ label, to }) => (
        <Item key={to}>
          <Link to={to}>{label}</Link>
        </Item>
      ))}
    </Wrapper>
  )
}
