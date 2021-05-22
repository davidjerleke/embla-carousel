import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react'

export type NavigationContextType = {
  isOpen: boolean
  toggleNavigation: () => void
  closeNavigation: () => void
}

export const NavigationContext = createContext<NavigationContextType>({
  isOpen: false,
  toggleNavigation: () => undefined,
  closeNavigation: () => undefined,
})

type PropType = PropsWithChildren<{}>

export const NavigationProvider = (props: PropType) => {
  const { children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleNavigation = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [setIsOpen])

  const closeNavigation = useCallback(() => {
    if (isOpen) setIsOpen(false)
  }, [setIsOpen, isOpen])

  const value = useMemo(
    () => ({
      isOpen,
      toggleNavigation,
      closeNavigation,
    }),
    [isOpen, toggleNavigation, closeNavigation],
  )

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}
