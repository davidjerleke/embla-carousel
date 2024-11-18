import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { LAYERS } from 'consts/layers'
import { MEDIA } from 'consts/breakpoints'
import { useCallback } from 'react'
import { useEventListener } from 'hooks/useEventListener'
import { ROUTES_LOADING_BAR_HEIGHT } from 'consts/routes'
import { HEADER_HEIGHT } from 'consts/header'
import { MODALS } from 'consts/modal'
import {
  selectIsModalOpen,
  setModalClosed
} from 'components/Modal/modalReducer'
import {
  selectRoutesLoading,
  setRoutesLoading
} from 'components/Routes/routesReducer'

const ANIMATION_NAME = 'routes-loading-progress'

const RoutesLoadingWrapper = styled.div`
  z-index: ${LAYERS.NAVIGATION + LAYERS.STEP};
  top: ${HEADER_HEIGHT};
  height: ${ROUTES_LOADING_BAR_HEIGHT};
  left: 0;
  right: 0;
  position: fixed;
  pointer-events: none;
  overflow: hidden;

  ${MEDIA.DESKTOP} {
    top: 0;
  }
`

const ProgressBar = styled.div<{ $loading: boolean; $animating: boolean }>`
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  z-index: ${LAYERS.STEP};
  height: ${ROUTES_LOADING_BAR_HEIGHT};
  width: 100%;
  opacity: 1;
  animation-duration: ${({ $loading }) => ($loading ? '15s' : '1s')};
  animation-name: ${({ $animating }) => ($animating ? ANIMATION_NAME : 'none')};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transition: opacity 0.6s;
  pointer-events: none;

  @keyframes ${ANIMATION_NAME} {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`

type PropType = { pageId: string }

export const RoutesLoading = (props: PropType) => {
  const { pageId } = props
  const isRoutesLoading = useAppSelector(selectRoutesLoading)
  const isOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_NAVIGATION))
  const [animating, setAnimating] = useState(true)
  const lastPageId = useRef<PropType['pageId']>(pageId)
  const progressElement = useRef<HTMLDivElement>(null)
  const animationRaf = useRef(0)
  const animationTimeout = useRef(0)
  const dispatch = useAppDispatch()

  const onAnimationEnd = useCallback(() => setAnimating(false), [])
  useEventListener('animationend', onAnimationEnd, progressElement)

  useEffect(() => {
    if (!isRoutesLoading) return

    const progress = progressElement.current
    if (!progress) return
    setAnimating(true)

    progress.style.animationName = 'none'
    progress.style.opacity = '0'

    animationRaf.current = window.requestAnimationFrame(() => {
      animationTimeout.current = window.setTimeout(() => {
        progress.style.animationName = ''
        progress.style.opacity = '1'
      }, 0)
    })
  }, [isRoutesLoading])

  useEffect(() => {
    if (isRoutesLoading) return

    const raf = animationRaf.current
    const timeout = animationTimeout.current
    if (raf) cancelAnimationFrame(raf)
    if (timeout) clearTimeout(timeout)

    if (progressElement.current) progressElement.current.style.opacity = '0'
  }, [isRoutesLoading])

  useEffect(() => {
    if (pageId !== lastPageId.current && isOpen) {
      dispatch(setModalClosed(MODALS.SITE_NAVIGATION))
    }
    lastPageId.current = pageId
    dispatch(setRoutesLoading(false))
  }, [pageId, isOpen, dispatch])

  useEffect(() => {
    return () => {
      const raf = animationRaf.current
      const timeout = animationTimeout.current
      if (raf) cancelAnimationFrame(raf)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <RoutesLoadingWrapper>
      <ProgressBar
        ref={progressElement}
        $loading={isRoutesLoading}
        $animating={animating}
      />
    </RoutesLoadingWrapper>
  )
}
