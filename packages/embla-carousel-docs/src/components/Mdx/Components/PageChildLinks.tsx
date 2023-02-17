import React from 'react'
import { useRouteChildren } from 'hooks/useRouteChildren'
import { useRouteCurrent } from 'hooks/useRouteCurrent'
import { CardLink } from 'components/Link/CardLink'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import styled from 'styled-components'
import { FONT_SIZES } from 'consts/fontSizes'
import { COLORS } from 'consts/themes'

const USP_ITEM_SPACING = SPACINGS.CUSTOM(({ TWO }) => TWO + 0.2)

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-left: -${USP_ITEM_SPACING} !important;
  margin-bottom: -${USP_ITEM_SPACING};
  list-style: none !important;
`

const Item = styled.li`
  padding-left: ${USP_ITEM_SPACING};
  padding-bottom: ${USP_ITEM_SPACING};
  flex: 0 0 100%;
  min-width: 0;

  ${MEDIA.MIN_XS} {
    flex: 0 0 calc(100% / 2);
  }

  ${MEDIA.MIN_SM} {
    flex: 0 0 calc(100% / 2);
  }
`

const UspHeader = styled.h3`
  color: ${COLORS.TEXT_BODY};
  margin-top: 0;
  margin-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  font-size: ${FONT_SIZES.H4};
  font-weight: bold;
`

const UspText = styled.p`
  margin-bottom: ${SPACINGS.THREE};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const PageChildLinks = () => {
  const routeChildren = useRouteChildren(useRouteCurrent())

  if (routeChildren.length === 0) return null

  return (
    <div>
      <Wrapper>
        {routeChildren.map(({ id, slug, title, description }) => (
          <Item key={id}>
            <CardLink to={slug}>
              <div>
                <UspHeader>{title}</UspHeader>
                <UspText>{description}</UspText>
              </div>
            </CardLink>
          </Item>
        ))}
      </Wrapper>
    </div>
  )
}
