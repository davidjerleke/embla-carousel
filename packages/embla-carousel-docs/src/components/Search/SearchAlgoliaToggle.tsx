import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SearchButton, SearchButtonIcon } from 'components/Search/SearchButton'
import { useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { useEventListener } from 'hooks/useEventListener'

export const isAnyKeyPressed = (
  keysPressed: string[],
  keysToCheck: string[]
): boolean => {
  return keysToCheck.some((key) => keysPressed.includes(key))
}

export const areKeysPressed = (
  keysPressed: string[],
  keysToCheck: string[]
): boolean => {
  return keysToCheck.every((key) => keysPressed.includes(key))
}

const CLOSE_KEYS = ['Escape', 'Esc']
const TOGGLE_KEYS_1 = ['Control', 'k']
const TOGGLE_KEYS_2 = ['Meta', 'k']

type PropType = {
  toggleSearch: () => void
  closeSearch: () => void
}

export const SearchAlgoliaToggle = (props: PropType) => {
  const { toggleSearch, closeSearch } = props
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const toggleElement = useRef<HTMLButtonElement>(null)
  const areCloseKeysPressed = isAnyKeyPressed(keysPressed, CLOSE_KEYS)
  const areToggleKeysPressed1 = areKeysPressed(keysPressed, TOGGLE_KEYS_1)
  const areToggleKeysPressed2 = areKeysPressed(keysPressed, TOGGLE_KEYS_2)

  const onKeyDown = useCallback(({ key }: KeyboardEvent) => {
    setKeysPressed((keysPressed) => {
      if (keysPressed.includes(key)) return keysPressed
      return [...keysPressed, key]
    })
  }, [])

  const onKeyUp = useCallback(({ key }: KeyboardEvent) => {
    if (key === 'Meta') setKeysPressed([])
    setKeysPressed((keysPressed) => keysPressed.filter((k) => k !== key))
  }, [])

  useEventListener('keydown', onKeyDown)
  useEventListener('keyup', onKeyUp)

  useEffect(() => {
    if (areCloseKeysPressed) return closeSearch()
    if (areToggleKeysPressed1 || areToggleKeysPressed2) return toggleSearch()
  }, [
    toggleSearch,
    closeSearch,
    areCloseKeysPressed,
    areToggleKeysPressed1,
    areToggleKeysPressed2
  ])

  const loadSearchAlgolia = useCallback(async () => {
    const module = await import('components/Search/SearchAlgolia')
    return { default: module.SearchAlgolia }
  }, [])

  useEventListener('mouseenter', loadSearchAlgolia, toggleElement, {
    passive: true
  })
  useEventListener('touchstart', loadSearchAlgolia, toggleElement, {
    passive: true
  })

  return (
    <SearchButton
      ref={toggleElement}
      $isKeyNavigating={isKeyNavigating}
      onClick={toggleSearch}
    >
      <SearchButtonIcon svg="search" />
    </SearchButton>
  )
}
