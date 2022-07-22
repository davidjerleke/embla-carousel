import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon'

const Heading = styled(IconWithText)`
  font-weight: bold;
`

const Wrapper = styled.div`
  color: var(--text-admonition-note);
  background-color: rgba(var(--text-admonition-note-rgb-value), 0.05);
  border: 0.1rem solid rgba(var(--text-admonition-note-rgb-value), 0.1);
  margin-bottom: 2.4rem;
  padding: 1.8rem 2.4rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  overflow: hidden;

  p,
  ${Heading} {
    margin-bottom: 0.8rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

type PropType = PropsWithChildren<{}>

export const Admonition = (props: PropType) => {
  const { children } = props

  return (
    <Wrapper>
      <Heading iconSvg="info">Note</Heading>
      {children}
    </Wrapper>
  )
}
