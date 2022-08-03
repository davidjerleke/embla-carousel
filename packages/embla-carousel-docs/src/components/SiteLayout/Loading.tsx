import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { COLORS, LAYERS, MEDIA } from 'consts'
import { gradientBackgroundStyles } from 'utils'
import { HEADER_HEIGHT } from 'components/Header'
import { useNavigation, useRoutes } from 'hooks'

// opacity: ${({ $loading }) => ($loading ? 1 : 0)};
// visibility: ${({ $loading }) => ($loading ? 'visible' : 'hidden')};
// pointer-events: ${({ $loading }) => ($loading ? 'auto' : 'none')};
const positionStyles = css`
  position: fixed;
  z-index: ${LAYERS.NAVIGATION + LAYERS.STEP};
  top: ${HEADER_HEIGHT};
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;

  ${MEDIA.DESKTOP} {
    top: 0;
  }
`

const Overlay = styled.div<{ $loading: boolean }>`
  ${positionStyles};
  opacity: ${({ $loading }) => ($loading ? 0.9 : 0)};
  visibility: ${({ $loading }) => ($loading ? 'visible' : 'hidden')};
  pointer-events: ${({ $loading }) => ($loading ? 'auto' : 'none')};
  background-color: ${COLORS.BACKGROUND_SITE};
  transition: visibility 0.3s linear, opacity 0.3s linear;

  ${MEDIA.DESKTOP} {
    display: none;
  }
`

const ProgressBarWrapper = styled.div`
  ${positionStyles};
  z-index: ${LAYERS.NAVIGATION + LAYERS.STEP};
  overflow: hidden;
`

const ProgressBar = styled.div<{ $loading: boolean }>`
  ${gradientBackgroundStyles};
  z-index: ${LAYERS.STEP};
  height: 0.3rem;
  width: 100%;
  opacity: 1;
  animation-duration: ${({ $loading }) => ($loading ? '15s' : '1s')};
  animation-name: progress;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  transition: opacity 0.4s;
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

export const Loading = (props: PropType) => {
  const { pageId } = props
  const { isLoading, setIsLoading } = useRoutes()
  const { isOpen, closeNavigation } = useNavigation()
  const lastPageId = useRef<PropType['pageId']>(pageId)
  const progressElement = useRef<HTMLDivElement>(null)
  const resetAnimationRaf = useRef(0)
  const resetAnimationTimeout = useRef(0)

  useEffect(() => {
    if (!isLoading) return

    const progress = progressElement.current
    if (!progress) return

    progress.style.animationName = 'none'
    progress.style.opacity = '0'

    resetAnimationRaf.current = window.requestAnimationFrame(() => {
      resetAnimationTimeout.current = window.setTimeout(() => {
        progress.style.animationName = ''
        progress.style.opacity = '1'
      }, 0)
    })
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    if (progressElement.current) progressElement.current.style.opacity = '0'
  }, [isLoading])

  useEffect(() => {
    if (pageId !== lastPageId.current && isOpen) closeNavigation()
    lastPageId.current = pageId
    setIsLoading(false)
  }, [pageId, isOpen, closeNavigation, setIsLoading])

  useEffect(() => {
    return () => {
      if (resetAnimationRaf.current) {
        cancelAnimationFrame(resetAnimationRaf.current)
      }
      if (resetAnimationTimeout.current) {
        clearTimeout(resetAnimationTimeout.current)
      }
    }
  }, [])

  return (
    <>
      <Overlay $loading={isLoading} />
      <ProgressBarWrapper>
        <ProgressBar ref={progressElement} $loading={isLoading} />
      </ProgressBarWrapper>
    </>
  )
}
