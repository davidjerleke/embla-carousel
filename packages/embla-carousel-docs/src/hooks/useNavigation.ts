import { useContext } from 'react'
import {
  NavigationContext,
  NavigationContextType,
} from 'components/SiteNavigation/Context'

export const useNavigation = (): NavigationContextType =>
  useContext(NavigationContext)
