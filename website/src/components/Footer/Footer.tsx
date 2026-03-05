import styled from 'styled-components'
import { PageFrame } from '@/components/Page/PageFrame'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { FooterLinks } from '@/components/Footer/FooterLinks'
import { SPACINGS } from '@/utils/spacings'

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

export function Footer() {
  return (
    <FooterWrapper>
      <SectionWrapper>
        <FooterLinks />
      </SectionWrapper>
    </FooterWrapper>
  )
}
