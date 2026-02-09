import { ComponentPropsWithRef, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppSelector } from '@/hooks/redux'
import { selectKeyNavigating } from '@/components/KeyEvents/key-events-reducer'
import { BORDER_SIZES } from '@/utils/border'
import { SPACINGS } from '@/utils/spacings'
import { COLORS } from '@/utils/theme'
import { LAYERS } from '@/utils/layers'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { KeyNavigatingPropType } from '@/utils/key-events'
import {
  SCROLLBAR_SIZE,
  createScrollBarShadowStyles,
  createScrollBarStyles
} from '@/utils/scrollbars'

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

export const TabsListScrollArea = styled.div<KeyNavigatingPropType>`
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

type PropType = ComponentPropsWithRef<'div'> & {
  children?: ReactNode | undefined
}

export function TabsList(props: PropType) {
  const { children, ...restProps } = props
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <TabsListWrapper {...restProps}>
      <TabsListScrollArea $isKeyNavigating={isKeyNavigating}>
        {children}
      </TabsListScrollArea>
    </TabsListWrapper>
  )
}
