'use client'

import { useCallback } from 'react'
import { useEventListener } from '@/hooks/use-event-listener'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  selectKeyNavigating,
  setIsKeyNavigating
} from '@/components/KeyEvents/key-events-reducer'

export function KeyEventsInit() {
  const dispatch = useAppDispatch()
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  const onMouseDown = useCallback(() => {
    if (isKeyNavigating) dispatch(setIsKeyNavigating(false))
  }, [dispatch, isKeyNavigating])

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Tab' && !isKeyNavigating) dispatch(setIsKeyNavigating(true))
    },
    [dispatch, isKeyNavigating]
  )

  useEventListener('keydown', onKeyDown)
  useEventListener('mousedown', onMouseDown)

  return null
}
