import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from '@/utils/redux'

export type RoutesStateType = {
  isLoading: boolean
}

const initialState: RoutesStateType = {
  isLoading: false
}

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutesLoading: (
      state,
      action: PayloadAction<RoutesStateType['isLoading']>
    ): void => {
      state.isLoading = action.payload
    }
  }
})

const { name, reducer } = routesSlice
export { name as routesName, reducer as routesReducer }

export const { setRoutesLoading } = routesSlice.actions

export function selectRoutesLoading(state: AppStateType): boolean {
  return state.routes.isLoading
}
