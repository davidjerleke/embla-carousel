import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from 'consts/redux'
import { THEME_KEYS, ThemeKeyType } from 'consts/themes'

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

export const selectTheme = (state: AppStateType): ThemeKeyType =>
  state.theme.currentTheme
