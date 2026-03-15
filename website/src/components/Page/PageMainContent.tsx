import styled from 'styled-components'
import { MAIN_CONTENT_ID } from '@/utils/page'
import { HEADER_HEIGHT } from '@/utils/header'
import { SPACINGS } from '@/utils/spacings'

export const PageMainContent = styled.div.attrs({
  id: MAIN_CONTENT_ID
})`
  scroll-margin-top: calc(${HEADER_HEIGHT} + ${SPACINGS.FOUR});
`
