import React from 'react'
import styled from 'styled-components'
import FocusTrap from 'focus-trap-react'
import { SandboxSelectionType } from 'consts/sandbox'
import { ButtonBare, ButtonBareText } from 'components/Button/ButtonBare'
import { COLORS } from 'consts/themes'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'
import { MEDIA } from 'consts/breakpoints'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { Icon } from 'components/Icon/Icon'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { SandboxSelectionForm } from 'components/Sandbox/SandboxSelectionForm'
import { ModalPortal } from 'components/Modal/ModalPortal'
import { BORDER_RADIUSES } from 'consts/border'

export const SELECT_CODESANDBOX_DIALOG_ID = 'select-codesandbox-dialog'
const MODAL_MAX_WIDTH = '36rem'
const DESKTOP_END_SPACING = SPACINGS.TEN

const BUTTON_SIZE = '4rem'
const ICON_SIZE = '1.8rem'

const SandboxSelectionModalWrapper = styled.div`
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
  max-width: ${MODAL_MAX_WIDTH};

  ${MEDIA.DESKTOP} {
    box-shadow: 0 0 0 0.1rem ${COLORS.DETAIL_LOW_CONTRAST};
    top: ${DESKTOP_END_SPACING};
    max-height: calc(100vh - ${DESKTOP_END_SPACING} * 2);
    height: auto;
    border-radius: ${BORDER_RADIUSES.SOFT};
  }
`

const Overlay = styled.div`
  z-index: ${LAYERS.SEARCH};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${COLORS.BACKGROUND_SITE};

  ${MEDIA.DESKTOP} {
    opacity: 0.9;
  }
`

const CloseButton = styled(ButtonBare)`
  ${createSquareSizeStyles(BUTTON_SIZE)};
  z-index: ${LAYERS.STEP};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${PAGE_FRAME_SPACING};
  right: ${PAGE_FRAME_SPACING};
  margin-right: calc((${BUTTON_SIZE} - ${ICON_SIZE}) / 2 * -1);
  margin-top: -${SPACINGS.CUSTOM(() => 0.4)};

  ${ButtonBareText} {
    display: flex;
  }
`

const ScrollArea = styled.div`
  padding: 0 ${PAGE_FRAME_SPACING};
  overflow: auto;
  position: relative;
  max-height: 100%;
`

type PropType = {
  sandboxes: SandboxSelectionType[]
  closeModal: () => void
}

export const SandboxSelectionModal = (props: PropType) => {
  const { sandboxes, closeModal } = props

  return (
    <ModalPortal>
      <FocusTrap active={true}>
        <div>
          <Overlay onClick={closeModal} />

          <SandboxSelectionModalWrapper
            role="dialog"
            aria-modal="true"
            aria-label="Select CodeSandbox Dialog"
            aria-labelledby={SELECT_CODESANDBOX_DIALOG_ID}
          >
            <CloseButton
              aria-label="Hide Select CodeSandbox Dialog"
              onClick={closeModal}
            >
              <Icon svg="cross" size={ICON_SIZE} />
            </CloseButton>

            <ScrollArea>
              <SandboxSelectionForm sandboxes={sandboxes || []} />
            </ScrollArea>
          </SandboxSelectionModalWrapper>
        </div>
      </FocusTrap>
    </ModalPortal>
  )
}
