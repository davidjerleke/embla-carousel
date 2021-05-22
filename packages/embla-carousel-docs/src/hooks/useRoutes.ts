import { useContext } from 'react'
import {
  RoutesContext,
  RoutesContextType as UseRoutesType,
} from 'components/Routes'

export const useRoutes = (): UseRoutesType => {
  return useContext(RoutesContext)
}
