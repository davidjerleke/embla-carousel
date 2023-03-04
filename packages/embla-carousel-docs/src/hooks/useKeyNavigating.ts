import { useContext } from 'react'
import {
  KeyNavigatingContext,
  KeyNavigatingContextType,
} from 'components/KeyNavigating/KeyNavigatingContext'

export const useKeyNavigating = (): KeyNavigatingContextType =>
  useContext(KeyNavigatingContext)
