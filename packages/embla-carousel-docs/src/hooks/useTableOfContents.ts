import { useContext } from 'react'
import {
  TableOfContentsContext,
  TableOfContentsContextType,
} from 'components/TableOfContents/Context'

export const useTableOfContents = (): TableOfContentsContextType =>
  useContext(TableOfContentsContext)
