import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from 'consts/redux'

export type KeyEventsStateType = {
  isKeyNavigating: boolean
}

const initialState: KeyEventsStateType = {
  isKeyNavigating: false
}

const keyEventsSlice = createSlice({
  name: 'keyEvents',
  initialState,
  reducers: {
    setIsKeyNavigating: (
      state,
      action: PayloadAction<KeyEventsStateType['isKeyNavigating']>
    ): void => {
      state.isKeyNavigating = action.payload
    }
  }
})

const { name, reducer } = keyEventsSlice
export { name as keyEventsName, reducer as keyEventsReducer }

export const { setIsKeyNavigating } = keyEventsSlice.actions

export const selectKeyNavigating = (state: AppStateType): boolean =>
  state.keyEvents.isKeyNavigating
