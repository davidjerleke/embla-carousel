import styled from 'styled-components'
import { MEDIA } from '@/utils/breakpoints'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { SiteLogo } from '@/components/SiteLogo/SiteLogo'
import { createSquareSizeStyles } from '@/utils/create-square-size-styles'
import { BRAND_GRADIENT_TEXT_STYLES } from '@/utils/gradients'
import { createGapStyles } from '@/utils/create-gap-styles'
import { PageMainContent } from '@/components/Page/PageMainContent'
import { GLOBAL_DATA, DOCS_LATEST_VERSION } from '@/utils/global-data'
import {
  LinkButtonPrimaryFilled,
  LinkButtonPrimaryOutlined
} from '@/components/Link/LinkButton'

const MAX_CONTENT_WIDTH = '50rem'

const HeroBrandWrapper = styled.div`
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
    ${createSquareSizeStyles('32rem')};
  }

  ${MEDIA.MIN_LG} {
    ${createSquareSizeStyles('34rem')};
  }
`

const Content = styled.div`
  max-width: ${MAX_CONTENT_WIDTH};

  ${MEDIA.MAX_MD} {
    padding-top: ${SPACINGS.FOUR};
    text-align: center;
  }

  ${MEDIA.MAX_SM} {
    padding-top: ${SPACINGS.TWO};
  }
`

const H1 = styled.h1`
  color: ${COLORS.TEXT_HIGH_CONTRAST};
  margin-bottom: ${SPACINGS.FOUR};
  font-size: ${FONT_SIZES.CUSTOM(() => 5)};
  line-height: 0.9;
  font-weight: ${FONT_WEIGHTS.BLACK};

  > span {
    display: block;
  }

  > span:nth-child(2) {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }

  ${MEDIA.MIN_XS} {
    font-size: ${FONT_SIZES.CUSTOM(() => 5.6)};
  }

  ${MEDIA.MIN_SM} {
    font-size: ${FONT_SIZES.CUSTOM(() => 6.2)};
  }

  ${MEDIA.MIN_MD} {
    font-size: ${FONT_SIZES.CUSTOM(() => 8)};
  }
`

const H2 = styled.h2`
  color: ${COLORS.TEXT_MEDIUM_CONTRAST};
  font-size: ${FONT_SIZES.H4};
  line-height: 1.5;

  ${MEDIA.MIN_SM} {
    font-size: ${FONT_SIZES.CUSTOM(() => 2.1)};
  }
`

const CtaWrapper = styled(PageMainContent)`
  ${createGapStyles(SPACINGS.TWO, SPACINGS.TWO)};
  display: flex;
  flex-wrap: wrap;
  padding-top: ${SPACINGS.FOUR};

  ${MEDIA.MIN_SM} {
    padding-top: ${SPACINGS.SIX};
  }
  ${MEDIA.COMPACT} {
    justify-content: center;
  }
`

export function HeroBrand() {
  const { TITLE, DESCRIPTION } = GLOBAL_DATA

  return (
    <HeroBrandWrapper>
      <HeroLogo appearance="blur" />
      <Content>
        <H1>
          {TITLE.split(' ').map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </H1>
        <H2>{DESCRIPTION}</H2>

        <CtaWrapper as="ul">
          <li>
            <LinkButtonPrimaryFilled href="/docs/examples/predefined/">
              Examples
            </LinkButtonPrimaryFilled>
          </li>
          <li>
            <LinkButtonPrimaryOutlined href={DOCS_LATEST_VERSION.SLUG}>
              Get started
            </LinkButtonPrimaryOutlined>
          </li>
        </CtaWrapper>
      </Content>
    </HeroBrandWrapper>
  )
}
