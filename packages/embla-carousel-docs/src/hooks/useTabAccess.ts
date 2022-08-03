import { useContext } from 'react'
import {
  TabAccessContext,
  TabAccessContextType,
} from 'components/TabAccess/Context'

export const useTabAccess = (): TabAccessContextType =>
  useContext(TabAccessContext)
