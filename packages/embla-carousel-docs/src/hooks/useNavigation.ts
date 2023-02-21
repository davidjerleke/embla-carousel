import { useContext } from 'react'
import {
  NavigationContext,
  NavigationContextType,
} from 'components/SiteNavigation/SiteNavigationContext'

export const useNavigation = (): NavigationContextType =>
  useContext(NavigationContext)
