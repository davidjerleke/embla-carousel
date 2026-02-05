import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppStateType } from '@/utils/redux'
import { RouteType } from '@/utils/routes'

export type RoutesStateType = {
  hierarchical: RouteType[]
  flat: RouteType[]
  isLoading: boolean
}

const initialState: RoutesStateType = {
  hierarchical: [],
  flat: [],
  isLoading: false
}

const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes: (
      state,
      action: PayloadAction<Pick<RoutesStateType, 'flat' | 'hierarchical'>>
    ): void => {
      state.hierarchical = action.payload.hierarchical
      state.flat = action.payload.flat
    },
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

export const { setRoutes, setRoutesLoading } = routesSlice.actions

export function selectHierarchalRoutes(state: AppStateType): RouteType[] {
  return state.routes.hierarchical
}

export function selectFlatRoutes(state: AppStateType): RouteType[] {
  return state.routes.flat
}

export function selectRoutesLoading(state: AppStateType): boolean {
  return state.routes.isLoading
}
