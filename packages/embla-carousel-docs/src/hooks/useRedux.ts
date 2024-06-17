import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatchType, AppStateType } from 'consts/redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>()
export const useAppSelector = useSelector.withTypes<AppStateType>()
export const useAppStore = useStore.withTypes<AppStateType>()
