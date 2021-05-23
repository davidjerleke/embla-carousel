import { useContext } from 'react'
import { SearchContext, SearchContextType } from 'components/Search'

export const useSearch = (): SearchContextType => useContext(SearchContext)
