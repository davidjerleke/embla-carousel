import React from 'react'
import styled from 'styled-components'
import { MEDIA, COLORS, SPACINGS } from 'consts'
import { SiteLogo } from 'components/SiteLogo'
import { createSquareSizeStyles, gradientTextStyles } from 'utils'
import { useSiteMetadata } from 'hooks'
import { SKIP_TO_CONTENT_ID } from 'components/TabAccess'
import { PrimaryButtonLink } from 'components/Link'

const MAX_CONTENT_WIDTH = '50rem'

const Wrapper = styled.div`
  padding-top: ${SPACINGS.FOUR};
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
  ${createSquareSizeStyles('16rem')};

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
  line-height: 0.9;
  font-weight: 900;
  font-size: 5rem;

  > span {
    display: block;
  }

  > span:nth-child(2) {
    ${gradientTextStyles};
  }

  ${MEDIA.MIN_XS} {
    font-size: 5.6rem;
  }

  ${MEDIA.MIN_SM} {
    font-size: 6.2rem;
  }
`

const H2 = styled.h2`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  line-height: 1.5;
  font-size: 1.9rem;

  ${MEDIA.MIN_SM} {
    font-size: 2.1rem;
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
          {title.split(' ').map((word, index, words) => (
            <span key={`${word}-${index}`}>
              {index === words.length - 1 ? word : `${word} `}
            </span>
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
