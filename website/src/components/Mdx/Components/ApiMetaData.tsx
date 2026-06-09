import styled from 'styled-components'
import { COLORS } from '@/utils/theme'
import { FONT_SIZES } from '@/utils/font-sizes'
import { CODE_HIGHLIGHT_CLASS_NAME } from '@/components/Mdx/Components/Code'
import { SPACINGS } from '@/utils/spacings'
import { createScrollBarStyles } from '@/utils/scrollbars'
import { MEDIA } from '@/utils/breakpoints'
import { PAGE_FRAME_SPACING } from '@/utils/page'
import { TRUNCATE_STYLES } from '@/utils/truncate-styles'

export const ApiMetaDataWrapper = styled.div``

const Row = styled.div`
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  display: flex;
  align-items: center;
  column-gap: ${SPACINGS.ONE};

  ${MEDIA.COMPACT} {
    ${MEDIA.NO_HOVER} {
      margin-right: -${PAGE_FRAME_SPACING};
    }
  }
`

const Key = styled.span`
  flex: 0 0 auto;
`

const Scrollable = styled.span`
  display: flex;
  flex: 0 1 auto;
  column-gap: ${SPACINGS.ONE};
  padding: 0;

  ${MEDIA.COMPACT} {
    ${MEDIA.NO_HOVER} {
      overflow-x: scroll;
      margin-bottom: 0;
      ${createScrollBarStyles('x')};
    }
  }

  ${MEDIA.WHEN(`${MEDIA.HOVER}, ${MEDIA.DESKTOP}`)} {
    overflow: hidden;
  }
`

const ColoredCode = styled.code<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 1.3rem !important;
  flex: 0 0 auto;

  ${MEDIA.WHEN(`${MEDIA.HOVER}, ${MEDIA.DESKTOP}`)} {
    ${TRUNCATE_STYLES};
    flex: 0 1 auto;
  }
`

type PropType = {
  firstRow: [string, string]
  secondRow: [string, string]
}

export function ApiMetaData(props: PropType) {
  const { firstRow, secondRow } = props
  const [firstKey, firstValue] = firstRow
  const [secondKey, secondValue] = secondRow

  return (
    <ApiMetaDataWrapper>
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
    </ApiMetaDataWrapper>
  )
}
