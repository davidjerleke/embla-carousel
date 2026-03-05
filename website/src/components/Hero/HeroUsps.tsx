import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { MEDIA } from '@/utils/breakpoints'
import { SPACINGS } from '@/utils/spacings'
import { LinkCard } from '@/components/Link/LinkCard'
import { createGapStyles } from '@/utils/create-gap-styles'

const USP_ITEM_SPACING = SPACINGS.CUSTOM(() => 1.4)

const HeroUspsWrapper = styled.ul`
  ${createGapStyles(USP_ITEM_SPACING, USP_ITEM_SPACING, 'li')};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${SPACINGS.EIGHT};

  ${MEDIA.MIN_SM} {
    padding-top: ${SPACINGS.ELEVEN};
    padding-bottom: ${SPACINGS.THREE};
  }

  ${MEDIA.MIN_MD} {
    padding-top: ${SPACINGS.TWELVE};
    padding-bottom: ${SPACINGS.EIGHT};
  }
`

const Usp = styled.li`
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

export function HeroUsps() {
  return (
    <HeroUspsWrapper>
      <Usp>
        <LinkCard href="/docs/api/">
          <div>
            <UspHeader>Highly Extensible</UspHeader>
            <UspText>
              An API designed with flexibility and extensibility in mind.
            </UspText>
          </div>
        </LinkCard>
      </Usp>
      <Usp>
        <LinkCard href="/docs/plugins/">
          <div>
            <UspHeader>Plugin System</UspHeader>
            <UspText>
              Add functionality and customize your carousels as you go.
            </UspText>
          </div>
        </LinkCard>
      </Usp>
      <Usp>
        <LinkCard href="/docs/guides/server-side-rendering">
          <div>
            <UspHeader>Server-Side Rendering</UspHeader>
            <UspText>Works seamlessly with SSR frameworks.</UspText>
          </div>
        </LinkCard>
      </Usp>
    </HeroUspsWrapper>
  )
}
