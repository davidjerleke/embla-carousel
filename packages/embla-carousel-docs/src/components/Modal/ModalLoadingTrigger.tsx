import { useEffect } from 'react'
import { useAppDispatch } from 'hooks/useRedux'
import { ModalsType } from 'consts/modal'
import {
  removeModalIsLoading,
  setModalIsLoading
} from 'components/Modal/modalReducer'

type PropType = {
  modal: ModalsType
}

export const ModalLoadingTrigger = (props: PropType) => {
  const { modal } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setModalIsLoading(modal))

    return () => {
      dispatch(removeModalIsLoading(modal))
    }
  }, [modal, dispatch])

  return null
}
