import styled from 'styled-components'
import { LinkBare } from '@/components/Link/LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from '@/utils/gradients'
import { COLORS } from '@/utils/theme'
import { SPACINGS } from '@/utils/spacings'
import { FONT_WEIGHTS } from '@/utils/font-sizes'
import { IconWithText, IconWithTextText } from '@/components/Icon/IconWithText'
import { createGapStyles } from '@/utils/create-gap-styles'
import { DocsPagePaginationType } from '@/utils/docs-pagination'

const ITEM_SPACING = SPACINGS.FOUR

const PagePaginationWrapper = styled.nav`
  ${createGapStyles(ITEM_SPACING, '', 'div')};
  display: flex;
  justify-content: space-between;
  margin-top: ${SPACINGS.EIGHT};
`

const Item = styled.div`
  > a {
    color: ${COLORS.BRAND_PRIMARY};
  }

  &:nth-child(2) > a {
    text-align: right;
    color: ${COLORS.BRAND_SECONDARY};
  }
`

const ItemLabel = styled.div`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding-bottom: ${SPACINGS.ONE};
`

const ItemTitle = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: ${FONT_WEIGHTS.MEDIUM};

  ${IconWithTextText} {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }
`

type PropType = DocsPagePaginationType

export function PagePagination(props: PropType) {
  const { next, previous } = props

  return (
    <PagePaginationWrapper aria-label="Pagination Navigation">
      <Item>
        {previous && (
          <LinkBare href={previous.slug}>
            <ItemLabel>Previous</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowLeft">{previous.title}</IconWithText>
            </ItemTitle>
          </LinkBare>
        )}
      </Item>

      <Item>
        {next && (
          <LinkBare href={next.slug}>
            <ItemLabel>Next</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowRight" iconSide="right">
                {next.title}
              </IconWithText>
            </ItemTitle>
          </LinkBare>
        )}
      </Item>
    </PagePaginationWrapper>
  )
}
