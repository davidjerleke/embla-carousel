import { useContext } from 'react'
import {
  RoutesContext,
  RoutesContextType as UseRoutesType,
} from 'components/Routes/RoutesContext'

export const useRoutes = (): UseRoutesType => useContext(RoutesContext)
