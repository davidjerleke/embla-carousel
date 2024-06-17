import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from 'consts/redux'
import { TABS_LIBRARY, TABS_PACKAGE_MANAGER } from 'consts/tabs'

export type TabsStateType = {
  tabSelections: { [key: string]: string }
}

const initialState: TabsStateType = {
  tabSelections: {
    [TABS_PACKAGE_MANAGER.GROUP_ID]: TABS_PACKAGE_MANAGER.TABS.NPM.VALUE,
    [TABS_LIBRARY.GROUP_ID]: TABS_LIBRARY.TABS.VANILLA.VALUE
  }
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabSelection: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ): void => {
      const { key, value } = action.payload
      state.tabSelections[key] = value
    }
  }
})

const { name, reducer } = tabsSlice
export { name as tabsName, reducer as tabsReducer }

export const { setTabSelection } = tabsSlice.actions

export const selectTabSelections = (
  state: AppStateType
): TabsStateType['tabSelections'] => state.tabs.tabSelections
