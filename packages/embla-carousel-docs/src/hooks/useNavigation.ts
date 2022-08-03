import { useContext } from 'react'
import {
  NavigationContext,
  NavigationContextType,
} from 'components/Navigation/Context'

export const useNavigation = (): NavigationContextType =>
  useContext(NavigationContext)
