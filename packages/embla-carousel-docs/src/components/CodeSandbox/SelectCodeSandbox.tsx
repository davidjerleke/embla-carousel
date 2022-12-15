import React, { useState } from 'react'
import styled from 'styled-components'
import { SelectCodeSandboxType } from './sandboxTypes'
import { BareButton } from 'components/Button/BareButton'
import { gradientTextStyles } from 'utils/gradientTextStyles'
import { IconWithText } from 'components/Icon/IconWithText'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { FRAME_SPACING } from 'components/SiteLayout/Frame'
import { Icon } from 'components/Icon/Icon'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { FONT_SIZES } from 'consts/fontSizes'
import { SelectCodeSandboxForm } from './SelectCodeSandboxForm'

const MODAL_MAX_WIDTH = '36rem'
const DESKTOP_END_SPACING = SPACINGS.TEN

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '2.35rem'

const SelectCodeSandboxButton = styled(BareButton)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  align-items: center;
  padding: 1.2rem 0 1.2rem 0;
  border-radius: 0.4rem;
  font-weight: 500;
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.ONE};

  span {
    ${gradientTextStyles};
  }
`

const SelectionModal = styled.div`
  z-index: ${LAYERS.SEARCH};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:before {
    position: absolute;
    background-color: ${COLORS.BACKGROUND_SITE};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    content: '';
    display: flex;

    ${MEDIA.DESKTOP} {
      opacity: 0.9;
    }
  }
`

const SelectionModalContent = styled.div`
  padding: ${FRAME_SPACING};
  background-color: ${COLORS.BACKGROUND_SITE};
  z-index: ${LAYERS.STEP};
  position: relative;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 100vh;
  max-width: ${MODAL_MAX_WIDTH};

  ${MEDIA.DESKTOP} {
    box-shadow: 0 0 0 0.1rem ${COLORS.DETAIL_LOW_CONTRAST};
    margin: ${DESKTOP_END_SPACING} auto;
    height: calc(100vh - ${DESKTOP_END_SPACING} * 2);
  }
`

const SelectionModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACINGS.FOUR};
`

const SelectionModalHeading = styled.h3`
  margin: 0 !important;
`

const SelectionModalCloseButton = styled(BareButton)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  margin-right: calc((${BUTTON_SIZE} - ${ICON_SIZE}) / 2 * -1);
  display: flex;
  align-items: center;
  justify-content: center;
`

export type PropType = {
  sandboxes: SelectCodeSandboxType[]
}

export const SelectCodeSandbox = (props: PropType) => {
  const { sandboxes = [] } = props
  const [selectionOpen, setSelectionOpen] = useState(false)

  return (
    <>
      <SelectCodeSandboxButton onClick={() => setSelectionOpen(true)}>
        <IconWithText iconSvg="pen" iconSize="1.4rem">
          Edit Code
        </IconWithText>
      </SelectCodeSandboxButton>
      {selectionOpen && (
        <SelectionModal>
          <SelectionModalContent>
            <SelectionModalHeader>
              <SelectionModalHeading>Select CodeSandbox</SelectionModalHeading>
              <SelectionModalCloseButton>
                <Icon
                  svg="cross"
                  size={ICON_SIZE}
                  onClick={() => setSelectionOpen(false)}
                />
              </SelectionModalCloseButton>
            </SelectionModalHeader>
            <SelectCodeSandboxForm sandboxes={sandboxes} />
          </SelectionModalContent>
        </SelectionModal>
      )}
    </>
  )
}
