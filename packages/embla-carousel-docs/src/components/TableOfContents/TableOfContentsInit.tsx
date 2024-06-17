import { useEffect, useRef } from 'react'
import { setTableOfContents } from 'components/TableOfContents/tableOfContentsReducer'
import { useAppDispatch } from 'hooks/useRedux'
import { TableOfContentsType } from 'consts/tableOfContents'

type PropType = {
  tableOfContents: TableOfContentsType
}

export const TableOfContentsInit = (props: PropType) => {
  const { tableOfContents } = props
  const dispatch = useAppDispatch()
  const tableOfContentsHasBeenSet = useRef(false)

  useEffect(() => {
    if (!tableOfContentsHasBeenSet.current) return

    dispatch(setTableOfContents(tableOfContents))
  }, [tableOfContents, dispatch])

  if (tableOfContentsHasBeenSet.current) return

  tableOfContentsHasBeenSet.current = true
  dispatch(setTableOfContents(tableOfContents))

  return null
}
