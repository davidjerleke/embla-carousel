import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import FocusTrap from 'focus-trap-react'
import { SandboxSelectionType } from 'consts/sandbox'
import { ButtonBare } from 'components/Button/ButtonBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { IconWithText, IconWithTextText } from 'components/Icon/IconWithText'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { BORDER_RADIUSES } from 'consts/border'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { Icon } from 'components/Icon/Icon'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { SandboxSelectionForm } from './SandboxSelectionForm'
import { Portal } from 'components/Portal/Portal'
import { useEventListener } from 'hooks/useEventListener'

export const SELECT_CODESANDBOX_DIALOG_ID = 'select-codesandbox-dialog'
const CLOSE_KEYS = ['Escape', 'Esc']
const MODAL_MAX_WIDTH = '36rem'
const DESKTOP_END_SPACING = SPACINGS.TEN

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '2.35rem'

const SandboxSelectionWrapper = styled.div`
  margin-top: -${SPACINGS.THREE};
`

const SandboxSelectionOpenModalButton = styled(ButtonBare)`
  color: ${COLORS.TEXT_LOW_CONTRAST};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  margin-bottom: ${SPACINGS.ONE};
  padding: ${SPACINGS.TWO} 0 ${SPACINGS.TWO} 0;
  border-radius: ${BORDER_RADIUSES.BOX};
  align-items: center;
  font-weight: ${FONT_WEIGHTS.MEDIUM};

  ${IconWithTextText} {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }
`

const SandboxSelectionModal = styled.div`
  z-index: ${LAYERS.SEARCH + LAYERS.STEP};
  padding: ${PAGE_FRAME_SPACING} 0;
  background-color: ${COLORS.BACKGROUND_SITE};
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
    max-width: ${MODAL_MAX_WIDTH};
    box-shadow: 0 0 0 0.1rem ${COLORS.DETAIL_LOW_CONTRAST};
    top: ${DESKTOP_END_SPACING};
    max-height: calc(100vh - ${DESKTOP_END_SPACING} * 2);
    height: auto;
  }
`

const SandboxSelectionModalOverlay = styled.div`
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

const SandboxSelectionModalCloseButton = styled(ButtonBare)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  z-index: ${LAYERS.STEP};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
`

const SandboxSelectionScrollArea = styled.div`
  padding: 0 ${PAGE_FRAME_SPACING};
  overflow: auto;
  position: relative;
  max-height: 100%;
`

export type PropType = {
  sandboxes: SandboxSelectionType[]
}

export const SandboxSelection = (props: PropType) => {
  const { sandboxes = [] } = props
  const [selectionOpen, setSelectionOpen] = useState(false)

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (CLOSE_KEYS.includes(key)) setSelectionOpen(false)
    },
    [setSelectionOpen]
  )

  useEventListener('keyup', onKeyUp)

  return (
    <SandboxSelectionWrapper>
      <SandboxSelectionOpenModalButton
        id={SELECT_CODESANDBOX_DIALOG_ID}
        aria-expanded={selectionOpen}
        aria-label="Show Select CodeSandbox Dialog"
        onClick={() => setSelectionOpen(true)}
      >
        <IconWithText iconSvg="pen" iconSize="1.4rem">
          Edit Code
        </IconWithText>
      </SandboxSelectionOpenModalButton>

      {selectionOpen && (
        <Portal>
          <FocusTrap active={true}>
            <div>
              <SandboxSelectionModalOverlay
                onClick={() => setSelectionOpen(false)}
              />

              <SandboxSelectionModal
                role="dialog"
                aria-modal="true"
                aria-label="Select CodeSandbox Dialog"
                aria-labelledby={SELECT_CODESANDBOX_DIALOG_ID}
              >
                <SandboxSelectionModalCloseButton
                  aria-label="Hide Select CodeSandbox Dialog"
                  onClick={() => setSelectionOpen(false)}
                >
                  <Icon svg="cross" size={ICON_SIZE} />
                </SandboxSelectionModalCloseButton>

                <SandboxSelectionScrollArea>
                  <SandboxSelectionForm sandboxes={sandboxes} />
                </SandboxSelectionScrollArea>
              </SandboxSelectionModal>
            </div>
          </FocusTrap>
        </Portal>
      )}
    </SandboxSelectionWrapper>
  )
}
