import React from 'react'
import styled from 'styled-components'
import { Frame, FRAME_SPACING } from 'components/SiteLayout'
import { Links } from './Links'

const Wrapper = styled.footer`
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
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
