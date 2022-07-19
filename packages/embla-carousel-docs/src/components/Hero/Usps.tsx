import React from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon'
import { ContentLink } from 'components/Link'
import { breakpoints, supportsStyles } from 'consts'

const USP_ITEM_SPACING = '1.4rem'

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -${USP_ITEM_SPACING};
  margin-bottom: -${USP_ITEM_SPACING};
  padding-top: 4.6rem;
  padding-bottom: 0.2rem;

  ${breakpoints.minSm} {
    padding-top: 7rem;
    padding-bottom: 2.6rem;
  }

  ${breakpoints.minMd} {
    padding-top: 9.8rem;
    padding-bottom: 5.4rem;
  }
`

const Usp = styled.li`
  padding-left: ${USP_ITEM_SPACING};
  padding-bottom: ${USP_ITEM_SPACING};
  flex: 0 0 100%;

  ${breakpoints.minXs} {
    flex: 0 0 calc(100% / 2);
  }

  ${breakpoints.minSm} {
    flex: 0 0 calc(100% / 3);
  }
`

const UspContent = styled.div`
  padding: 2.4rem 2.4rem;
  background-color: var(--background-code);
  border-radius: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UspHeader = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
`

const UspText = styled.p`
  margin-bottom: 1.4rem;
  color: var(--text-low-contrast);
`

const UspLink = styled.div`
  > a {
    font-size: 1.4rem;
    color: var(--brand-primary);

    ${supportsStyles.gradientText} {
      color: var(--brand-secondary);
    }
  }
`

export const Usps = () => {
  return (
    <Wrapper>
      <Usp>
        <UspContent>
          <div>
            <UspHeader>Highly Extensible</UspHeader>
            <UspText>
              An API designed with flexibility and extensibility in mind.
            </UspText>
          </div>
          <UspLink>
            <ContentLink to="/api/">
              <IconWithText iconSvg="arrowRight" iconSide="right">
                Documentation
              </IconWithText>
            </ContentLink>
          </UspLink>
        </UspContent>
      </Usp>
      <Usp>
        <UspContent>
          <div>
            <UspHeader>Plugin System</UspHeader>
            <UspText>
              Add functionality and customize your carousels as you go.
            </UspText>
          </div>
          <UspLink>
            <ContentLink to="/plugins/">
              <IconWithText iconSvg="arrowRight" iconSide="right">
                Documentation
              </IconWithText>
            </ContentLink>
          </UspLink>
        </UspContent>
      </Usp>
      <Usp>
        <UspContent>
          <div>
            <UspHeader>Fully Typed</UspHeader>
            <UspText>
              Built-in types because it is written in TypeScript.
            </UspText>
          </div>
          <UspLink>
            <ContentLink to="/get-started/typescript/">
              <IconWithText iconSvg="arrowRight" iconSide="right">
                Documentation
              </IconWithText>
            </ContentLink>
          </UspLink>
        </UspContent>
      </Usp>
    </Wrapper>
  )
}
