import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLORS } from 'consts/themes'
import styled from 'styled-components'
import { LoadSpinner } from 'components/LoadSpinner/LoadSpinner'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { LAYERS } from 'consts/layers'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { useEventListener } from 'hooks/useEventListener'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { HEADER_HEIGHT } from 'consts/header'
import { ModalPortal } from 'components/Modal/ModalPortal'

const getOpacity = (isVisible: boolean, showLoader: boolean): number => {
  if (!isVisible) return 0
  if (!showLoader) return 0
  return 1
}

const WRAPPER_SIZE = '6rem'
const LOADER_SIZE = '4rem'

const LoadSpinnerSuspenseWrapper = styled.div<{
  $opacity: number
  $isPortal: boolean
}>`
  background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.9);
  border-radius: ${BORDER_RADIUSES.CIRCLE};
  z-index: ${LAYERS.MODAL_LOADING};
  ${createSquareSizeStyles(WRAPPER_SIZE)};
  top: calc(${HEADER_HEIGHT} + ${PAGE_FRAME_SPACING});
  position: ${({ $isPortal }) => ($isPortal ? 'fixed' : 'absolute')};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $opacity }) => $opacity};
  transition: ${({ $opacity }) => `opacity ${$opacity === 1 ? 0 : 0.6}s`};
  box-shadow: 0 0 0 ${BORDER_SIZES.DETAIL} ${COLORS.DETAIL_LOW_CONTRAST};
  pointer-events: none;
`

type PropType = {
  isVisible: boolean
  usePortal?: boolean
}

export const LoadSpinnerSuspense = (props: PropType) => {
  const { isVisible, usePortal } = props
  const [showLoader, setShowLoader] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const isPortal = usePortal ?? true
  const Wrapper = isPortal ? ModalPortal : React.Fragment

  const onLoaderTransitionEnd = useCallback(() => {
    if (!opacity) setShowLoader(false)
  }, [opacity])

  useEffect(() => {
    const newOpacity = getOpacity(isVisible, showLoader)
    setOpacity(newOpacity)
  }, [isVisible, showLoader])

  useEffect(() => {
    if (isVisible) setShowLoader(true)
  }, [isVisible])

  useEventListener('transitionend', onLoaderTransitionEnd, loaderRef)

  if (!isVisible && !showLoader) return null

  return (
    <Wrapper>
      <LoadSpinnerSuspenseWrapper
        $opacity={opacity}
        $isPortal={isPortal}
        ref={loaderRef}
      >
        <LoadSpinner size={LOADER_SIZE} color={COLORS.TEXT_BODY} />
      </LoadSpinnerSuspenseWrapper>
    </Wrapper>
  )
}
