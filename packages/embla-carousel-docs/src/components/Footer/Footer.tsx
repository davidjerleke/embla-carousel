import React from 'react'
import styled from 'styled-components'
import { PageFrame, PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { VersionBadge } from 'components/VersionBadge/VersionBadge'
import { FooterLinks } from './FooterLinks'
import { SPACINGS } from 'consts/spacings'

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  padding-top: ${PAGE_FRAME_SPACING};
  padding-bottom: ${PAGE_FRAME_SPACING};
  gap: ${SPACINGS.TWO};
`

const SectionWrapper = styled(PageFrame)`
  display: flex;
  justify-content: center;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <SectionWrapper>
        <FooterLinks />
      </SectionWrapper>

      <SectionWrapper>
        <VersionBadge />
      </SectionWrapper>
    </FooterWrapper>
  )
}
