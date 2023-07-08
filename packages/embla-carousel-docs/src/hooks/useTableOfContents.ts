import { useContext } from 'react'
import {
  TableOfContentsContext,
  TableOfContentsContextType
} from 'components/TableOfContents/TableOfContentsContext'

export const useTableOfContents = (): TableOfContentsContextType =>
  useContext(TableOfContentsContext)
