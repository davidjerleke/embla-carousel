import React from 'react'
import styled from 'styled-components'
import { PropType as PageType } from 'templates/Page'
import { BareLink } from 'components/Link/BareLink'
import { brandGradientTextStyles } from 'consts/gradients'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { IconWithText } from 'components/Icon/IconWithText'

const ITEM_SPACING = SPACINGS.FOUR

const PagePaginationWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: ${SPACINGS.EIGHT};
  margin-left: -${ITEM_SPACING};
`

const Item = styled.div`
  padding-left: ${ITEM_SPACING};

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
  font-weight: 500;
`

const GradientText = styled.span`
  ${brandGradientTextStyles};
`

type PropType = {
  next: PageType['pageContext']['next']
  previous: PageType['pageContext']['previous']
}

export const PagePagination = (props: PropType) => {
  const { next, previous } = props

  return (
    <PagePaginationWrapper aria-label="Pagination Navigation">
      <Item>
        {previous && (
          <BareLink to={previous.slug}>
            <ItemLabel>Previous</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowLeft">
                <GradientText>{previous.title}</GradientText>
              </IconWithText>
            </ItemTitle>
          </BareLink>
        )}
      </Item>
      <Item>
        {next && (
          <BareLink to={next.slug}>
            <ItemLabel>Next</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowRight" iconSide="right">
                <GradientText>{next.title}</GradientText>
              </IconWithText>
            </ItemTitle>
          </BareLink>
        )}
      </Item>
    </PagePaginationWrapper>
  )
}
