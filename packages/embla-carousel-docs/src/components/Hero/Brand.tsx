import React from 'react'
import styled from 'styled-components'
import { breakpoints, cssHackStyles } from 'consts'
import { SiteLogo } from 'components/SiteLogo'
import { createSquareSizeStyles, gradientTextStyles } from 'utils'
import { useSiteMetadata } from 'hooks'
import { SKIP_TO_CONTENT_ID } from 'components/TabAccess'
import { PrimaryButtonLink } from 'components/Link'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 2.4rem;

  ${breakpoints.minSm} {
    padding-top: 3.6rem;
  }

  ${breakpoints.minMd} {
    padding-top: 7.4rem;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
`

const HeroLogo = styled(SiteLogo)`
  flex: 0 0 auto;
  ${createSquareSizeStyles('16rem')};

  ${breakpoints.minSm} {
    ${createSquareSizeStyles('22rem')};
  }

  ${breakpoints.minMd} {
    ${createSquareSizeStyles('28rem')};
  }
`

const Content = styled.div`
  max-width: 50rem;

  ${breakpoints.maxMd} {
    padding-top: 3.6rem;
    text-align: center;
  }

  ${breakpoints.maxSm} {
    padding-top: 2.4rem;
  }
`

const H1 = styled.h1`
  color: var(--text-high-contrast);
  line-height: 0.9;
  margin-bottom: 1.8rem;
  font-weight: 900;
  font-size: 5rem;

  ${cssHackStyles.firefoxAll} {
    font-weight: 1000;
  }

  > span {
    display: block;
  }

  > span:nth-child(2) {
    ${gradientTextStyles};
  }

  ${breakpoints.minXs} {
    font-size: 5.6rem;
  }

  ${breakpoints.minSm} {
    font-size: 6.2rem;
  }
`

const H2 = styled.h2`
  color: var(--text-medium-contrast);
  line-height: 1.5;
  font-size: 1.9rem;

  ${breakpoints.minSm} {
    font-size: 2.1rem;
  }
`

const CtaWrapper = styled.div`
  padding-top: 2.4rem;

  ${breakpoints.minSm} {
    padding-top: 3.6rem;
  }
`

export const Brand = () => {
  const { title, description } = useSiteMetadata()

  return (
    <Wrapper>
      <HeroLogo />
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
