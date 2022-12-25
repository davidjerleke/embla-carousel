import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import FocusTrap from 'focus-trap-react'
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
import { Portal } from 'components/Portal/Portal'
import { useEventListener } from 'hooks/useEventListener'

export const SELECT_CODESANDBOX_DIALOG_ID = 'select-codesandbox-dialog'
const CLOSE_KEYS = ['Escape', 'Esc']
const MODAL_MAX_WIDTH = '36rem'
const DESKTOP_END_SPACING = SPACINGS.TEN

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '2.35rem'

const Wrapper = styled.div`
  margin-top: -${SPACINGS.THREE};
`

const SelectCodeSandboxButton = styled(BareButton)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.ONE};
  padding: ${SPACINGS.TWO} 0 ${SPACINGS.TWO} 0;
  align-items: center;
  border-radius: 0.4rem;
  font-weight: 500;

  span {
    ${gradientTextStyles};
  }
`

const SelectionModal = styled.div`
  z-index: ${LAYERS.SEARCH + LAYERS.STEP};
  padding: ${FRAME_SPACING} 0;
  background-color: ${COLORS.BACKGROUND_SITE};
  max-width: ${MODAL_MAX_WIDTH};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  height: 100vh;

  ${MEDIA.MIN_XS} {
    box-shadow: 0 0 0 0.1rem ${COLORS.DETAIL_LOW_CONTRAST};
    top: ${DESKTOP_END_SPACING};
    max-height: calc(100vh - ${DESKTOP_END_SPACING} * 2);
    height: auto;
  }
`

const SelectionModalOverlay = styled.div`
  z-index: ${LAYERS.SEARCH};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${COLORS.BACKGROUND_SITE};

  ${MEDIA.MIN_XS} {
    opacity: 0.9;
  }
`

const SelectionModalCloseButton = styled(BareButton)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  z-index: ${LAYERS.STEP};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
`

const SelectionModalScrollArea = styled.div`
  padding: 0 ${FRAME_SPACING};
  overflow: auto;
  position: relative;
  max-height: 100%;

  ${MEDIA.COMPACT} {
    padding-bottom: ${SPACINGS.TWELVE};
  }
`

export type PropType = {
  sandboxes: SelectCodeSandboxType[]
}

export const SelectCodeSandbox = (props: PropType) => {
  const { sandboxes = [] } = props
  const [selectionOpen, setSelectionOpen] = useState(false)

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (CLOSE_KEYS.includes(key)) setSelectionOpen(false)
    },
    [setSelectionOpen],
  )

  useEventListener('keyup', onKeyUp)

  return (
    <Wrapper>
      <SelectCodeSandboxButton
        id={SELECT_CODESANDBOX_DIALOG_ID}
        aria-expanded={selectionOpen}
        aria-label="Show Select CodeSandbox Dialog"
        onClick={() => setSelectionOpen(true)}
      >
        <IconWithText iconSvg="pen" iconSize="1.4rem">
          Edit Code
        </IconWithText>
      </SelectCodeSandboxButton>

      {selectionOpen && (
        <Portal>
          <FocusTrap active={true}>
            <div>
              <SelectionModalOverlay onClick={() => setSelectionOpen(false)} />

              <SelectionModal
                role="dialog"
                aria-modal="true"
                aria-label="Select CodeSandbox Dialog"
                aria-labelledby={SELECT_CODESANDBOX_DIALOG_ID}
              >
                <SelectionModalCloseButton
                  aria-label="Hide Select CodeSandbox Dialog"
                  onClick={() => setSelectionOpen(false)}
                >
                  <Icon svg="cross" size={ICON_SIZE} />
                </SelectionModalCloseButton>

                <SelectionModalScrollArea>
                  <SelectCodeSandboxForm sandboxes={sandboxes} />
                </SelectionModalScrollArea>
              </SelectionModal>
            </div>
          </FocusTrap>
        </Portal>
      )}
    </Wrapper>
  )
}
