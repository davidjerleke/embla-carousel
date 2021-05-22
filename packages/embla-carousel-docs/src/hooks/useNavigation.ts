import { useContext } from 'react'
import { NavigationContext, NavigationContextType } from 'components/Navigation'

export const useNavigation = (): NavigationContextType =>
  useContext(NavigationContext)
