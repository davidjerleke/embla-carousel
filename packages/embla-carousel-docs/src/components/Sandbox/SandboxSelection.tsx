import React, { Suspense, lazy, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { SandboxSelectionType } from 'consts/sandbox'
import { ButtonBare } from 'components/Button/ButtonBare'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { IconWithText, IconWithTextText } from 'components/Icon/IconWithText'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { BORDER_RADIUSES } from 'consts/border'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { ModalLoadingTrigger } from 'components/Modal/ModalLoadingTrigger'
import { useEventListener } from 'hooks/useEventListener'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { MODALS } from 'consts/modal'
import uniqueId from 'lodash/uniqueId'
import {
  selectIsModalOpen,
  setModalClosed,
  setModalOpen
} from 'components/Modal/modalReducer'

const SandboxSelectionModalLazy = lazy(async () => {
  const module = await import('components/Sandbox/SandboxSelectionModal')
  return { default: module.SandboxSelectionModal }
})

export const SELECT_CODESANDBOX_DIALOG_ID = 'select-codesandbox-dialog'
const CLOSE_KEYS = ['Escape', 'Esc']

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

export type PropType = {
  sandboxes: SandboxSelectionType[]
}

export const SandboxSelection = (props: PropType) => {
  const { sandboxes } = props
  const modalId = useRef(MODALS.EDIT_CODE(uniqueId()))
  const isOpen = useAppSelector(selectIsModalOpen(modalId.current))
  const toggleElement = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()

  const openModal = useCallback(() => {
    dispatch(setModalOpen(modalId.current))
  }, [dispatch])

  const closeModal = useCallback(() => {
    dispatch(setModalClosed(modalId.current))
  }, [dispatch])

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (CLOSE_KEYS.includes(key)) closeModal()
    },
    [closeModal]
  )

  useEventListener('keyup', onKeyUp)

  const loadSandboxSelection = useCallback(async () => {
    const module = await import('components/Sandbox/SandboxSelectionModal')
    return { default: module.SandboxSelectionModal }
  }, [])

  useEventListener('mouseenter', loadSandboxSelection, toggleElement, {
    passive: true
  })
  useEventListener('touchstart', loadSandboxSelection, toggleElement, {
    passive: true
  })

  return (
    <SandboxSelectionWrapper>
      <SandboxSelectionOpenModalButton
        id={SELECT_CODESANDBOX_DIALOG_ID}
        ref={toggleElement}
        aria-expanded={isOpen}
        aria-label="Show Select CodeSandbox Dialog"
        onClick={openModal}
      >
        <IconWithText iconSvg="pen" iconSize="1.4rem">
          Edit Code
        </IconWithText>
      </SandboxSelectionOpenModalButton>

      {isOpen && (
        <Suspense fallback={<ModalLoadingTrigger modal={modalId.current} />}>
          <SandboxSelectionModalLazy
            sandboxes={sandboxes}
            closeModal={closeModal}
          />
        </Suspense>
      )}
    </SandboxSelectionWrapper>
  )
}
