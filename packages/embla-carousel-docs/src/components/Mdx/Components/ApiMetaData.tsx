import React from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { CODE_HIGHLIGHT_CLASS_NAME } from './Code'
import { SPACINGS } from 'consts/spacings'
import { createScrollBarStyles, SCROLLBAR_SIZE } from 'consts/scrollBars'
import { MEDIA } from 'consts/breakpoints'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'

const Row = styled.div`
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${SPACINGS.ONE};

  ${MEDIA.COMPACT} {
    margin-right: -${PAGE_FRAME_SPACING};
  }
`

const Key = styled.span`
  flex: 0 0 auto;
`

const Scrollable = styled.span`
  display: flex;
  flex: 0 1 auto;
  overflow-x: scroll;
  ${createScrollBarStyles('x')};
  column-gap: ${SPACINGS.ONE};
  margin-bottom: -${SCROLLBAR_SIZE};
  padding: 0;

  @media (hover: none), (hover: on-demand) {
    visibility: visible;
    margin-bottom: 0;
  }
`

const ColoredCode = styled.code<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 1.3rem !important;
  flex: 0 0 auto;
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
        <Scrollable>
          <ColoredCode
            $color={COLORS.BRAND_PRIMARY}
            className={CODE_HIGHLIGHT_CLASS_NAME}
            key={firstValue}
          >
            {firstValue}
          </ColoredCode>
        </Scrollable>
      </Row>

      <Row>
        <Key>{secondKey}: </Key>
        <Scrollable>
          <ColoredCode
            $color={COLORS.BRAND_SECONDARY}
            className={CODE_HIGHLIGHT_CLASS_NAME}
          >
            {secondValue}
          </ColoredCode>
        </Scrollable>
      </Row>
    </p>
  )
}
