import React from 'react'
import styled from 'styled-components'
import { SKIP_TO_CONTENT_ID } from 'components/TabAccess'
import { ContentLink, CtaLink } from 'components/Link'
import { hiddenAtBreakpointStyles } from 'utils'
import { breakpoints } from 'consts'

const MAX_WIDTH = '60rem'

const CtaWrapper = styled.div`
  max-width: ${MAX_WIDTH};
  text-align: center;
  margin: 2.4rem auto 0 auto;

  ${breakpoints.minSm} {
    margin: 4rem auto 0 auto;
  }
`

const P = styled.p`
  color: var(--text-medium-contrast);
  text-align: center;
  margin-bottom: 2.4rem;
  font-size: 1.6rem;

  ${breakpoints.minSm} {
    font-size: 1.8rem;
  }
  ${hiddenAtBreakpointStyles};
`

export const Cta = () => {
  return (
    <CtaWrapper id={SKIP_TO_CONTENT_ID}>
      <P $hidden="maxSm">
        Build awesome carousels by extending Embla Carousel with your own CSS
        and JavaScript. Check out the{' '}
        <ContentLink to="/get-started/">documentation</ContentLink> to get
        started.
      </P>
      <CtaLink to="/examples/basic/">Try Examples</CtaLink>
    </CtaWrapper>
  )
}
