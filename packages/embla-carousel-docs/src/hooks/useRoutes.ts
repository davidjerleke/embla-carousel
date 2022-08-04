import { useContext } from 'react'
import {
  RoutesContext,
  RoutesContextType as UseRoutesType,
} from 'components/Routes/Context'

export const useRoutes = (): UseRoutesType => useContext(RoutesContext)
