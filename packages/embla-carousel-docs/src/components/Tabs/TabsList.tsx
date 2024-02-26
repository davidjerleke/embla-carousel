import React, { PropsWithRef, ReactNode } from 'react'
import styled from 'styled-components'
import { BORDER_SIZES } from 'consts/border'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import {
  SCROLLBAR_SIZE,
  createScrollBarShadowStyles,
  createScrollBarStyles
} from 'consts/scrollBars'
import { useKeyNavigating } from 'hooks/useKeyNavigating'

export const TabsListWrapper = styled.div`
  display: flex;
  position: relative;
  margin-bottom: calc(${SPACINGS.FOUR} - ${SCROLLBAR_SIZE});
  overflow: hidden;

  &:after {
    position: absolute;
    content: '';
    height: ${BORDER_SIZES.DETAIL};
    background-color: ${COLORS.DETAIL_LOW_CONTRAST};
    width: 100%;
    display: block;
    bottom: calc(${SCROLLBAR_SIZE} - ${BORDER_SIZES.DETAIL});
    z-index: ${LAYERS.STEP};

    @media (hover: none), (hover: on-demand) {
      bottom: ${SCROLLBAR_SIZE};
    }
  }
`

export const TabsListScrollArea = styled.div`
  ${createScrollBarStyles('x')};

  display: flex;
  width: 100%;
  overflow-x: scroll;

  @media (hover: none), (hover: on-demand) {
    overflow-x: auto;
    padding-bottom: ${SCROLLBAR_SIZE};
  }

  &:before,
  &:after {
    z-index: ${LAYERS.STEP};
    width: ${PAGE_FRAME_SPACING};
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
  }
  &:before {
    ${createScrollBarShadowStyles('left')};
    left: -4rem;
  }
  &:after {
    ${createScrollBarShadowStyles('right')};
    right: -4rem;
  }
`

type PropType = { children?: ReactNode | undefined } & PropsWithRef<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>

export const TabsList = (props: PropType) => {
  const { children, ...restProps } = props
  const { isKeyNavigating } = useKeyNavigating()

  return (
    <TabsListWrapper {...restProps}>
      <TabsListScrollArea $isKeyNavigating={isKeyNavigating}>
        {children}
      </TabsListScrollArea>
    </TabsListWrapper>
  )
}
