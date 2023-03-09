import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { brandGradientBackgroundStyles } from 'consts/gradients'
import { HEADER_HEIGHT } from 'components/Header/Header'
import { useRoutes } from 'hooks/useRoutes'
import { useNavigation } from 'hooks/useNavigation'
import { LAYERS } from 'consts/layers'
import { MEDIA } from 'consts/breakpoints'
import { SPACINGS } from 'consts/spacings'
import { useCallback } from 'react'
import { useEventListener } from 'hooks/useEventListener'

const PROGRESS_BAR_HEIGHT = SPACINGS.CUSTOM(({ ONE }) => ONE / 2)

const RoutesLoadingWrapper = styled.div`
  z-index: ${LAYERS.NAVIGATION + LAYERS.STEP};
  top: ${HEADER_HEIGHT};
  height: ${PROGRESS_BAR_HEIGHT};
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
  ${brandGradientBackgroundStyles};
  z-index: ${LAYERS.STEP};
  height: ${PROGRESS_BAR_HEIGHT};
  width: 100%;
  opacity: 1;
  animation-duration: ${({ $loading }) => ($loading ? '15s' : '1s')};
  animation-name: ${({ $animating }) => ($animating ? 'progress' : 'none')};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transition: opacity 0.6s;
  pointer-events: none;

  @keyframes progress {
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
  const { isLoading, setIsLoading } = useRoutes()
  const { isOpen, closeNavigation } = useNavigation()
  const [animating, setAnimating] = useState(true)
  const lastPageId = useRef<PropType['pageId']>(pageId)
  const progressElement = useRef<HTMLDivElement>(null)
  const animationRaf = useRef(0)
  const animationTimeout = useRef(0)

  const onAnimationEnd = useCallback(() => setAnimating(false), [])
  useEventListener('animationend', onAnimationEnd, progressElement)

  useEffect(() => {
    if (!isLoading) return

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
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return

    const raf = animationRaf.current
    const timeout = animationTimeout.current
    if (raf) cancelAnimationFrame(raf)
    if (timeout) clearTimeout(timeout)

    if (progressElement.current) progressElement.current.style.opacity = '0'
  }, [isLoading])

  useEffect(() => {
    if (pageId !== lastPageId.current && isOpen) closeNavigation()
    lastPageId.current = pageId
    setIsLoading(false)
  }, [pageId, isOpen, closeNavigation, setIsLoading])

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
        $loading={isLoading}
        $animating={animating}
      />
    </RoutesLoadingWrapper>
  )
}
