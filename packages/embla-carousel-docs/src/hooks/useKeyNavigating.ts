import { useContext } from 'react'
import {
  KeyNavigatingContext,
  KeyNavigatingContextType,
} from 'components/KeyNavigating/Context'

export const useKeyNavigating = (): KeyNavigatingContextType =>
  useContext(KeyNavigatingContext)
