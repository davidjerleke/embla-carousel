import { useCallback } from 'react'
import { useEventListener } from 'hooks/useEventListener'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import {
  selectKeyNavigating,
  setIsKeyNavigating
} from 'components/KeyEvents/keyEventsReducer'

export const KeyEventsInit = () => {
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
