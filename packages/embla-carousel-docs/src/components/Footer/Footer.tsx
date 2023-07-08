import React from 'react'
import styled from 'styled-components'
import { PageFrame, PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { FooterLinks } from './FooterLinks'

const FooterWrapper = styled.footer`
  padding-top: ${PAGE_FRAME_SPACING};
  padding-bottom: ${PAGE_FRAME_SPACING};
`

const Content = styled(PageFrame)`
  display: flex;
  justify-content: center;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <Content>
        <FooterLinks />
      </Content>
    </FooterWrapper>
  )
}
