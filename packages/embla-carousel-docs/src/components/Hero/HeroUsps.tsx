import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { CardLink } from 'components/Link/CardLink'

const USP_ITEM_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)

const HeroUspsWrapper = styled.ul`
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
  min-width: 0;
  flex: 0 0 100%;

  ${MEDIA.MIN_XS} {
    flex: 0 0 calc(100% / 2);
  }

  ${MEDIA.MIN_SM} {
    flex: 0 0 calc(100% / 3);
  }
`

const UspHeader = styled.h3`
  color: ${COLORS.TEXT_BODY};
  margin-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  font-size: ${FONT_SIZES.H4};
  font-weight: ${FONT_WEIGHTS.BOLD};
`

const UspText = styled.p`
  margin-bottom: ${SPACINGS.THREE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

export const HeroUsps = () => {
  return (
    <HeroUspsWrapper>
      <Usp>
        <CardLink to="/api/">
          <div>
            <UspHeader>Highly Extensible</UspHeader>
            <UspText>
              An API designed with flexibility and extensibility in mind.
            </UspText>
          </div>
        </CardLink>
      </Usp>
      <Usp>
        <CardLink to="/plugins/">
          <div>
            <UspHeader>Plugin System</UspHeader>
            <UspText>
              Add functionality and customize your carousels as you go.
            </UspText>
          </div>
        </CardLink>
      </Usp>
      <Usp>
        <CardLink to="/get-started/typescript/">
          <div>
            <UspHeader>Fully Typed</UspHeader>
            <UspText>
              Built-in types because it is written in TypeScript.
            </UspText>
          </div>
        </CardLink>
      </Usp>
    </HeroUspsWrapper>
  )
}
