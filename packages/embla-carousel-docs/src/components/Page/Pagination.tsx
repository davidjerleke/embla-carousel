import React from 'react'
import styled, { css } from 'styled-components'
import { PropType as PageType } from 'templates/Page'
import { PlainLink } from 'components/Link'
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons'
import { createSquareSizeStyles, gradientTextStyles } from 'utils'
import { supportsStyles } from 'consts'

const ITEM_SPACING = '2.4rem'

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 4.8rem;
  margin-left: -${ITEM_SPACING};
`

const Item = styled.div`
  padding-left: ${ITEM_SPACING};
  &:nth-child(2) {
    text-align: right;
  }
`

const ItemLabel = styled.div`
  color: var(--text-low-contrast);
  padding-bottom: 0.6rem;
`

const ItemTitle = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
`

const arrowSvgStyles = css`
  ${createSquareSizeStyles('1.8rem')}
  color: var(--brand-primary);
`

const ArrowLeftSvg = styled(ArrowLeftIcon)`
  ${arrowSvgStyles};
  margin-right: 0.6rem;
`

const ArrowRightSvg = styled(ArrowRightIcon)`
  ${arrowSvgStyles};
  ${supportsStyles.gradientText} {
    color: var(--brand-secondary);
  }
  margin-left: 0.6rem;
`

const GradientText = styled.span`
  ${gradientTextStyles};
`

type PropType = {
  next: PageType['pageContext']['next']
  previous: PageType['pageContext']['previous']
}

export const Pagination = (props: PropType) => {
  const { next, previous } = props

  return (
    <Wrapper aria-label="Pagination Navigation">
      <Item>
        {previous && (
          <PlainLink to={previous.slug}>
            <ItemLabel>Previous</ItemLabel>
            <ItemTitle>
              <ArrowLeftSvg aria-hidden="true" focusable="false" />
              <GradientText>{previous.title}</GradientText>
            </ItemTitle>
          </PlainLink>
        )}
      </Item>
      <Item>
        {next && (
          <PlainLink to={next.slug}>
            <ItemLabel>Next</ItemLabel>
            <ItemTitle>
              <GradientText>{next.title}</GradientText>
              <ArrowRightSvg aria-hidden="true" focusable="false" />
            </ItemTitle>
          </PlainLink>
        )}
      </Item>
    </Wrapper>
  )
}
