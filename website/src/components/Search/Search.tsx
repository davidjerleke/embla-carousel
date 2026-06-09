'use client'

import { lazy, useCallback, useEffect, useRef } from 'react'
import { SearchAlgoliaToggle } from '@/components/Search/SearchAlgoliaToggle'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { LoadSpinnerWithSuspense } from '@/components/LoadSpinner/LoadSpinnerWithSuspense'
import { MODALS } from '@/utils/modal'
import {
  selectIsModalOpen,
  setModalClosed,
  setModalOpen
} from '@/components/Modal/modal-reducer'

const SearchAlgoliaLazy = lazy(async () => {
  const module = await import('@/components/Search/SearchAlgolia')
  return { default: module.SearchAlgolia }
})

export function Search() {
  const dispatch = useAppDispatch()
  const isSearchOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_SEARCH))
  const isSearchOpenRef = useRef(isSearchOpen)

  const toggleSearch = useCallback(() => {
    if (isSearchOpenRef.current) {
      dispatch(setModalClosed())
      return
    }

    dispatch(setModalOpen(MODALS.SITE_SEARCH))
  }, [dispatch])

  const closeSearch = useCallback(() => {
    dispatch(setModalClosed())
  }, [dispatch])

  useEffect(() => {
    isSearchOpenRef.current = isSearchOpen
  }, [isSearchOpen])

  if (!isSearchOpen) {
    return (
      <SearchAlgoliaToggle
        toggleSearch={toggleSearch}
        closeSearch={closeSearch}
      />
    )
  }

  return (
    <LoadSpinnerWithSuspense
      fallback={
        <SearchAlgoliaToggle
          toggleSearch={toggleSearch}
          closeSearch={closeSearch}
        />
      }
    >
      <SearchAlgoliaLazy />
    </LoadSpinnerWithSuspense>
  )
}
