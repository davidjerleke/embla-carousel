import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react'

export type SearchContextType = {
  isOpen: boolean
  toggleSearch: () => void
  openSearch: () => void
  closeSearch: () => void
}

export const SearchContext = createContext<SearchContextType>({
  isOpen: false,
  toggleSearch: () => undefined,
  openSearch: () => undefined,
  closeSearch: () => undefined,
})

type PropType = PropsWithChildren<{}>

export const SearchProvider = (props: PropType) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSearch = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [setIsOpen])

  const openSearch = useCallback(() => {
    if (!isOpen) setIsOpen(true)
  }, [setIsOpen, isOpen])

  const closeSearch = useCallback(() => {
    if (isOpen) setIsOpen(false)
  }, [setIsOpen, isOpen])

  const value = useMemo(
    () => ({
      isOpen,
      toggleSearch,
      openSearch,
      closeSearch,
    }),
    [isOpen, toggleSearch, closeSearch],
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
