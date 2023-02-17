import React from 'react'
import styled from 'styled-components'
import { Frame, FRAME_SPACING } from 'components/SiteLayout/Frame'
import { Links } from './Links'

const FooterWrapper = styled.footer`
  padding-top: ${FRAME_SPACING};
  padding-bottom: ${FRAME_SPACING};
`

const Content = styled(Frame)`
  display: flex;
  justify-content: center;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <Content>
        <Links />
      </Content>
    </FooterWrapper>
  )
}
