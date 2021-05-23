import { useContext } from 'react'
import { TabAccessContext, TabAccessContextType } from 'components/TabAccess'

export const useTabAccess = (): TabAccessContextType =>
  useContext(TabAccessContext)
