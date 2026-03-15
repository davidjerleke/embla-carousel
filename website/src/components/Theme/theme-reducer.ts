import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from '@/utils/redux'
import { THEME_KEYS, ThemeKeyType } from '@/utils/theme'

export type ThemeStateType = {
  currentTheme: ThemeKeyType
}

const initialState: ThemeStateType = {
  currentTheme: THEME_KEYS.LIGHT
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeKeyType>): void => {
      state.currentTheme = action.payload
    },
    toggleTheme: (state): void => {
      const isLightTheme = state.currentTheme === THEME_KEYS.LIGHT
      const nextTheme = isLightTheme ? THEME_KEYS.DARK : THEME_KEYS.LIGHT

      state.currentTheme = nextTheme
    }
  }
})

const { name, reducer } = themeSlice
export { name as themeName, reducer as themeReducer }

export const { setTheme, toggleTheme } = themeSlice.actions

export function selectTheme(state: AppStateType): ThemeKeyType {
  return state.theme.currentTheme
}
