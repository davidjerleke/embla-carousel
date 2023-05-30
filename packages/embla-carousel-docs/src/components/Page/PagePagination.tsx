import React from 'react'
import styled from 'styled-components'
import { PropType as PageDefaultType } from 'templates/Default'
import { LinkBare } from 'components/Link/LinkBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_WEIGHTS } from 'consts/fontSizes'
import { IconWithText, IconWithTextText } from 'components/Icon/IconWithText'
import { createGapStyles } from 'utils/createGapStyles'

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

type PropType = {
  next: PageDefaultType['pageContext']['next']
  previous: PageDefaultType['pageContext']['previous']
}

export const PagePagination = (props: PropType) => {
  const { next, previous } = props

  return (
    <PagePaginationWrapper aria-label="Pagination Navigation">
      <Item>
        {previous && (
          <LinkBare to={previous.slug}>
            <ItemLabel>Previous</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowLeft">{previous.title}</IconWithText>
            </ItemTitle>
          </LinkBare>
        )}
      </Item>
      <Item>
        {next && (
          <LinkBare to={next.slug}>
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
