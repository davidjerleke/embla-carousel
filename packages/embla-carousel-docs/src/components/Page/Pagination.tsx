import React from 'react'
import styled from 'styled-components'
import { PropType as PageType } from 'templates/Page'
import { PlainLink } from 'components/Link'
import { gradientTextStyles } from 'utils'
import { supportsStyles } from 'consts'
import { IconWithText } from 'components/Icon'

const ITEM_SPACING = '2.4rem'

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 4.8rem;
  margin-left: -${ITEM_SPACING};
`

const Item = styled.div`
  padding-left: ${ITEM_SPACING};

  > a {
    color: var(--brand-primary);
  }

  &:nth-child(2) > a {
    text-align: right;
    ${supportsStyles.gradientText} {
      color: var(--brand-secondary);
    }
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
              <IconWithText iconSvg="arrowLeft">
                <GradientText>{previous.title}</GradientText>
              </IconWithText>
            </ItemTitle>
          </PlainLink>
        )}
      </Item>
      <Item>
        {next && (
          <PlainLink to={next.slug}>
            <ItemLabel>Next</ItemLabel>
            <ItemTitle>
              <IconWithText iconSvg="arrowRight" iconSide="right">
                <GradientText>{next.title}</GradientText>
              </IconWithText>
            </ItemTitle>
          </PlainLink>
        )}
      </Item>
    </Wrapper>
  )
}
