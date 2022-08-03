import React from 'react'
import styled from 'styled-components'
import { MEDIA, COLORS, SPACINGS, FONT_SIZES } from 'consts'
import { SiteLogo } from 'components/SiteLogo'
import { createSquareSizeStyles, gradientTextStyles } from 'utils'
import { useSiteMetadata } from 'hooks'
import { SKIP_TO_CONTENT_ID } from 'components/TabAccess'
import { PrimaryButtonLink } from 'components/Link'

const MAX_CONTENT_WIDTH = '50rem'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${MEDIA.MIN_SM} {
    padding-top: ${SPACINGS.SIX};
  }

  ${MEDIA.MIN_MD} {
    padding-top: ${SPACINGS.TWELVE};
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`

const HeroLogo = styled(SiteLogo)`
  flex: 0 0 auto;
  ${createSquareSizeStyles('15rem')};

  ${MEDIA.MIN_SM} {
    ${createSquareSizeStyles('22rem')};
  }

  ${MEDIA.MIN_MD} {
    ${createSquareSizeStyles('28rem')};
  }
`

const Content = styled.div`
  max-width: ${MAX_CONTENT_WIDTH};

  ${MEDIA.MAX_MD} {
    padding-top: ${SPACINGS.SIX};
    text-align: center;
  }

  ${MEDIA.MAX_SM} {
    padding-top: ${SPACINGS.FOUR};
  }
`

const H1 = styled.h1`
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  margin-bottom: ${SPACINGS.THREE};
  font-size: ${FONT_SIZES.CUSTOM(({ H2 }) => H2 * 2)};
  line-height: 0.9;
  font-weight: 900;

  > span {
    display: block;
  }

  > span:nth-child(2) {
    ${gradientTextStyles};
  }

  ${MEDIA.MIN_XS} {
    font-size: ${FONT_SIZES.CUSTOM(({ H1 }) => H1 + 2.4)};
  }

  ${MEDIA.MIN_SM} {
    font-size: ${FONT_SIZES.CUSTOM(({ H1 }) => H1 + 3)};
  }
`

const H2 = styled.h2`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  font-size: ${FONT_SIZES.H4};
  line-height: 1.5;

  ${MEDIA.MIN_SM} {
    font-size: ${FONT_SIZES.CUSTOM(({ H3 }) => H3 - 0.05)};
  }
`

const CtaWrapper = styled.div`
  padding-top: ${SPACINGS.FOUR};

  ${MEDIA.MIN_SM} {
    padding-top: ${SPACINGS.SIX};
  }
`

export const Brand = () => {
  const { title, description } = useSiteMetadata()

  return (
    <Wrapper>
      <HeroLogo appearance="blur" />
      <Content>
        <H1>
          {title.split(' ').map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </H1>
        <H2>{description}</H2>
        <CtaWrapper id={SKIP_TO_CONTENT_ID}>
          <PrimaryButtonLink to="/examples/basic/">
            Try Examples
          </PrimaryButtonLink>
        </CtaWrapper>
      </Content>
    </Wrapper>
  )
}
