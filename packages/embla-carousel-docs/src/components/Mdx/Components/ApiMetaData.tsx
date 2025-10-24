import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { CODE_HIGHLIGHT_CLASS_NAME } from './Code'
import { SPACINGS } from 'consts/spacings'
import { createScrollBarStyles } from 'consts/scrollBars'

const Row = styled.div`
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${SPACINGS.ONE};
`

const Key = styled.span`
  flex: 0 0 auto;
`

const ColoredCode = styled.code<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 1.3rem !important;
  flex: 0 1 auto;
  overflow: auto;
  ${createScrollBarStyles('x')};
`

type PropType = {
  firstRow: [string, string]
  secondRow: [string, string]
}

export const ApiMetaData = (props: PropType) => {
  const { firstRow, secondRow } = props
  const [firstKey, firstValue] = firstRow
  const [secondKey, secondValue] = secondRow

  return (
    <p>
      <Row>
        <Key>{firstKey}:</Key>
        <ColoredCode
          $color={COLORS.BRAND_PRIMARY}
          className={CODE_HIGHLIGHT_CLASS_NAME}
        >
          {firstValue}
        </ColoredCode>
      </Row>

      <Row>
        <Key>{secondKey}: </Key>
        <ColoredCode
          $color={COLORS.BRAND_SECONDARY}
          className={CODE_HIGHLIGHT_CLASS_NAME}
        >
          {secondValue}
        </ColoredCode>
      </Row>
    </p>
  )
}
