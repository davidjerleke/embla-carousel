import styled, { css } from 'styled-components'
import { SPACINGS } from 'consts/spacings'
import { createGapStyles } from 'utils/createGapStyles'
import { MEDIA } from 'consts/breakpoints'
import { InputText } from 'components/Input/InputText'

export const FORM_INPUT_TEXT_MAX_SIZE = '26rem'

export const FORM_ITEM_SPACING_X = SPACINGS.FOUR
export const FORM_ITEM_SPACING_Y = SPACINGS.TWO

export const FORM_ITEMS_GAP_STYLES = createGapStyles(
  FORM_ITEM_SPACING_X,
  FORM_ITEM_SPACING_Y,
  '*'
)

export const FORM_ITEM_MAX_WIDTH_STYLES = css`
  width: 100%;

  ${MEDIA.MIN_XS} {
    max-width: 100%;
    width: ${FORM_INPUT_TEXT_MAX_SIZE};
  }
`

export const CarouselGeneratorFormItems = styled.div`
  ${FORM_ITEMS_GAP_STYLES};
  margin-bottom: calc(${FORM_ITEM_SPACING_X} - ${FORM_ITEM_SPACING_Y});
  display: flex;
  flex-wrap: wrap;
`

export const CarouselGeneratorFormItem = styled.div`
  margin-bottom: ${FORM_ITEM_SPACING_X};
`

export const CarouselGeneratorInputText = styled(InputText)`
  ${FORM_ITEM_MAX_WIDTH_STYLES};
`
