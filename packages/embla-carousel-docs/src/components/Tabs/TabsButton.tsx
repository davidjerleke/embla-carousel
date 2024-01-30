import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { SPACINGS } from 'consts/spacings'
import { TabsItemType } from 'consts/tabs'
import { ButtonBare, ButtonBareText } from 'components/Button/ButtonBare'
import { COLORS } from 'consts/themes'
import { BORDER_SIZES } from 'consts/border'
import { PropType as ButtonPropType } from 'components/Button/ButtonBare'
import { LAYERS } from 'consts/layers'
import {
  ActiveText as TabsButtonActiveText,
  InactiveText as TabsButtonInactiveText
} from 'components/Link/LinkNavigation'

export const TabsButtonWrapper = styled(ButtonBare)<{ $selected: boolean }>`
  padding: ${SPACINGS.TWO} ${SPACINGS.TWO};
  position: relative;
  display: inline-flex;
  align-items: center;
  position: relative;

  &:disabled > ${ButtonBareText} > ${TabsButtonInactiveText} {
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      &:after {
        ${BRAND_GRADIENT_BACKGROUND_STYLES};
        z-index: ${LAYERS.STEP};
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${BORDER_SIZES.ACCENT_HORIZONTAL};
        pointer-events: none;
      }
    `};
`

type PropType = ButtonPropType & {
  tab: TabsItemType
  activeTab: TabsItemType
  groupId: string
  setActiveTab: (
    tab: TabsItemType,
    element: EventTarget & HTMLButtonElement
  ) => void
}

export const TabsButton = React.forwardRef(function TabsButton(
  props: PropType,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { tab, activeTab, groupId, setActiveTab, ...restProps } = props
  const isActive = tab.value === activeTab.value

  const setTab = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setActiveTab(tab, event.currentTarget)
    },
    [setActiveTab]
  )

  return (
    <TabsButtonWrapper
      role="tab"
      id={`tab-id-${tab.value}-${groupId}`}
      tabIndex={isActive ? 0 : -1}
      aria-controls={`panel-id-${tab.value}-${groupId}`}
      aria-selected={isActive}
      $selected={isActive}
      disabled={tab.disabled}
      onClick={setTab}
      ref={ref}
      {...restProps}
    >
      <TabsButtonInactiveText $isActive={isActive}>
        {tab.label}
      </TabsButtonInactiveText>
      <TabsButtonActiveText $isActive={isActive} aria-hidden="true">
        {tab.label}
      </TabsButtonActiveText>
    </TabsButtonWrapper>
  )
})
