import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon'

const Wrapper = styled.div`
  color: var(--text-admonition-note);
  background-color: rgba(var(--text-admonition-note-rgb-value), 0.05);
  border: 0.1rem solid rgba(var(--text-admonition-note-rgb-value), 0.1);
  margin-bottom: 2.4rem;
  padding: 1.8rem 2.4rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  overflow: hidden;

  p {
    margin-bottom: 0.8rem;
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`

const Heading = styled(IconWithText)`
  font-weight: bold;
`

type PropType = PropsWithChildren<{}>

export const Admonition = (props: PropType) => {
  const { children } = props

  return (
    <Wrapper>
      <p>
        <Heading iconSvg="info">Note</Heading>
      </p>
      {children}
    </Wrapper>
  )
}
