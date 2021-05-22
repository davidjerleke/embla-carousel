import React from 'react'
import styled from 'styled-components'
import { Frame } from 'components/SiteLayout'
import { Links } from './Links'

const Wrapper = styled.footer`
  padding-bottom: 2.4rem;
`

const Content = styled(Frame)`
  display: flex;
  justify-content: center;
`

export const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <Links />
      </Content>
    </Wrapper>
  )
}
