import React from 'react'
import styled from 'styled-components'
import { IconWithText } from 'components/Icon'
import { ContentLink } from 'components/Link'
import { COLORS, FONT_SIZES, MEDIA, SPACINGS, supportsStyles } from 'consts'
import { gradientTextStyles } from 'utils'

const USP_ITEM_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -${USP_ITEM_SPACING};
  margin-bottom: -${USP_ITEM_SPACING};
  padding-top: ${SPACINGS.EIGHT};

  ${MEDIA.MIN_SM} {
    padding-top: ${SPACINGS.ELEVEN};
    padding-bottom: ${SPACINGS.THREE};
  }

  ${MEDIA.MIN_MD} {
    padding-top: ${SPACINGS.SIXTEEN};
    padding-bottom: ${SPACINGS.EIGHT};
  }
`

const Usp = styled.li`
  padding-left: ${USP_ITEM_SPACING};
  padding-bottom: ${USP_ITEM_SPACING};
  flex: 0 0 100%;

  ${MEDIA.MIN_XS} {
    flex: 0 0 calc(100% / 2);
  }

  ${MEDIA.MIN_SM} {
    flex: 0 0 calc(100% / 3);
  }
`

const UspContent = styled.article`
  padding: ${SPACINGS.FOUR};
  background-color: ${COLORS.BACKGROUND_CODE};
  border-radius: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const UspHeader = styled.h3`
  margin-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  font-size: ${FONT_SIZES.H4};
  font-weight: bold;
`

const UspText = styled.p`
  margin-bottom: ${SPACINGS.THREE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

const UspLink = styled.div`
  span {
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    ${gradientTextStyles};
  }

  svg {
    color: ${COLORS.BRAND_PRIMARY};

    ${supportsStyles.gradientText} {
      color: ${COLORS.BRAND_SECONDARY};
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
                Read more
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
                Read more
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
                Read more
              </IconWithText>
            </ContentLink>
          </UspLink>
        </UspContent>
      </Usp>
    </Wrapper>
  )
}
