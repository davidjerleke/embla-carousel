import React, { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { SearchAlgoliaToggle } from 'components/Search/SearchAlgoliaToggle'
import { ModalLoadingTrigger } from 'components/Modal/ModalLoadingTrigger'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { MODALS } from 'consts/modal'
import {
  selectIsModalOpen,
  setAllModalsClosed,
  setModalClosed,
  setModalOpen
} from 'components/Modal/modalReducer'

const SearchAlgoliaLazy = lazy(async () => {
  const module = await import('components/Search/SearchAlgolia')
  return { default: module.SearchAlgolia }
})

export const Search = () => {
  const dispatch = useAppDispatch()
  const isSearchOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_SEARCH))
  const isSearchOpenRef = useRef(isSearchOpen)

  const toggleSearch = useCallback(() => {
    const toggleModal = isSearchOpenRef.current ? setModalClosed : setModalOpen

    if (toggleModal === setModalOpen) {
      dispatch(setAllModalsClosed())
    }
    dispatch(toggleModal(MODALS.SITE_SEARCH))
  }, [dispatch])

  const closeSearch = useCallback(() => {
    dispatch(setModalClosed(MODALS.SITE_SEARCH))
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
    <Suspense
      fallback={
        <>
          <SearchAlgoliaToggle
            toggleSearch={toggleSearch}
            closeSearch={closeSearch}
          />
          <ModalLoadingTrigger />
        </>
      }
    >
      <SearchAlgoliaLazy />
    </Suspense>
  )
}
