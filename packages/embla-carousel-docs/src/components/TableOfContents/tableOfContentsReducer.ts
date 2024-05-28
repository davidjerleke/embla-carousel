import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from 'consts/redux'
import { TableOfContentsItemType } from 'consts/tableOfContents'

export type TableOfContentsStateType = {
  items: TableOfContentsItemType
}

const initialState: TableOfContentsStateType = {
  items: {}
}

const tableOfContentsSlice = createSlice({
  name: 'tableOfContents',
  initialState,
  reducers: {
    setTableOfContents: (
      state,
      action: PayloadAction<TableOfContentsItemType>
    ): void => {
      const items = action.payload?.items && action.payload.items[0]
      state.items = items || {}
    }
  }
})

const { name, reducer } = tableOfContentsSlice
export { name as tableOfContentsName, reducer as tableOfContentsReducer }

export const { setTableOfContents } = tableOfContentsSlice.actions

export const selectTableOfContents = (
  state: AppStateType
): TableOfContentsItemType => state.tableOfContents.items
