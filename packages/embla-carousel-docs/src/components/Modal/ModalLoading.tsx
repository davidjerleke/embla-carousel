import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLORS } from 'consts/themes'
import styled from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectModalLoading } from './modalReducer'
import { LoadSpinner } from 'components/LoadSpinner/LoadSpinner'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { LAYERS } from 'consts/layers'
import { BORDER_RADIUSES } from 'consts/border'
import { useEventListener } from 'hooks/useEventListener'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'

const getOpacity = (isModalLoading: boolean, showLoader: boolean): number => {
  if (!isModalLoading) return 0
  if (!showLoader) return 0
  return 1
}

const WRAPPER_SIZE = '6rem'
const LOADER_SIZE = '4rem'

const ModalLoadingWrapper = styled.div<{ $opacity: number }>`
  background-color: rgba(${COLORS.BACKGROUND_SITE_RGB_VALUE}, 0.9);
  border-radius: ${BORDER_RADIUSES.CIRCLE};
  z-index: ${LAYERS.MODAL_LOADING};
  ${createSquareSizeStyles(WRAPPER_SIZE)};
  top: calc(${HEADER_HEIGHT} + ${PAGE_FRAME_SPACING});
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $opacity }) => $opacity};
  transition: ${({ $opacity }) => `opacity ${$opacity === 1 ? 0 : 0.6}s`};
`

export const ModalLoading = () => {
  const isModalLoading = useAppSelector(selectModalLoading)
  const [showLoader, setShowLoader] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)

  const onLoaderTransitionEnd = useCallback(() => {
    if (!opacity) setShowLoader(false)
  }, [opacity])

  useEffect(() => {
    const newOpacity = getOpacity(isModalLoading, showLoader)
    setOpacity(newOpacity)
  }, [isModalLoading, showLoader])

  useEffect(() => {
    if (isModalLoading) setShowLoader(true)
  }, [isModalLoading])

  useEventListener('transitionend', onLoaderTransitionEnd, loaderRef)

  if (!isModalLoading && !showLoader) return null

  return (
    <ModalLoadingWrapper $opacity={opacity} ref={loaderRef}>
      <LoadSpinner size={LOADER_SIZE} color={COLORS.TEXT_BODY} />
    </ModalLoadingWrapper>
  )
}
