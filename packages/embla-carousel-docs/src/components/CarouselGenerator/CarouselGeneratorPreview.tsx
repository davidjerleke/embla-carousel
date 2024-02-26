import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { CarouselGeneratorSubmit } from './CarouselGeneratorSubmit'
import { CarouselGeneratorCarousel } from './CarouselGeneratorCarousel'
import { Icon } from 'components/Icon/Icon'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'
import { LAYERS } from 'consts/layers'
import { MEDIA } from 'consts/breakpoints'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { BUTTON_SIZES } from 'consts/buttons'
import { BORDER_SIZES } from 'consts/border'
import { ButtonBare, ButtonBareText } from 'components/Button/ButtonBare'
import {
  MAIN_CONTENT_SPACING,
  SIDEBAR_LG_DOWN_WIDTH,
  SIDEBAR_LG_UP_WIDTH
} from 'components/Page/PageGrid'

const PREVIEW_WRAPPER_MAX_WIDTH = '52rem'

const CarouselGeneratorPreviewWrapper = styled.div<{
  $previewLarge: boolean
}>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  bottom: 0;
  z-index: ${LAYERS.HEADER};
  width: ${PREVIEW_WRAPPER_MAX_WIDTH};
  pointer-events: none;
  right: ${PAGE_FRAME_SPACING};
  max-width: calc(100% - ${PAGE_FRAME_SPACING} * 2);

  ${MEDIA.DESKTOP} {
    right: calc(
      ${SIDEBAR_LG_DOWN_WIDTH} + ${MAIN_CONTENT_SPACING} + ${PAGE_FRAME_SPACING}
    );
    max-width: calc(
      100% - ${SIDEBAR_LG_DOWN_WIDTH} * 2 - ${MAIN_CONTENT_SPACING} * 2 -
        ${PAGE_FRAME_SPACING} * 2
    );
  }
  ${MEDIA.MIN_LG} {
    right: calc(
      ${SIDEBAR_LG_UP_WIDTH} + ${MAIN_CONTENT_SPACING} + ${PAGE_FRAME_SPACING}
    );
  }
`

const ButtonsWrapper = styled.ul<{
  $previewLarge: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: ${SPACINGS.THREE};
  padding-bottom: ${SPACINGS.THREE};
  pointer-events: auto;
  width: 26rem;
`

const PreviewSizeButton = styled(ButtonBare)`
  ${BUTTON_SIZES.MD};
  box-shadow: 0 0 0 ${BORDER_SIZES.OUTLINE} ${COLORS.TEXT_MEDIUM_CONTRAST} inset;
  background-color: ${COLORS.BACKGROUND_SITE};
  line-height: 1.15;
  display: inline-flex;
  align-items: center;
  margin-right: ${SPACINGS.TWO};

  ${ButtonBareText} {
    display: flex;
    align-items: center;
  }
`

const PreviewSizeButtonText = styled.span`
  ${visuallyHiddenStyles};
`

export const CarouselGeneratorPreview = () => {
  const [previewLarge, setPreviewLarge] = useState(false)

  const togglePreviewSize = useCallback(() => {
    setPreviewLarge((currentSize) => !currentSize)
  }, [])

  return (
    <CarouselGeneratorPreviewWrapper $previewLarge={previewLarge}>
      <CarouselGeneratorCarousel previewLarge={previewLarge} />

      <ButtonsWrapper $previewLarge={previewLarge}>
        <li>
          <PreviewSizeButton type="button" onClick={togglePreviewSize}>
            <Icon
              svg={previewLarge ? 'shrink' : 'expand'}
              size={SPACINGS.THREE}
            />
            <PreviewSizeButtonText>
              {previewLarge ? 'Shrink' : 'Expand'} carousel preview
            </PreviewSizeButtonText>
          </PreviewSizeButton>
        </li>
        <li>
          <CarouselGeneratorSubmit />
        </li>
      </ButtonsWrapper>
    </CarouselGeneratorPreviewWrapper>
  )
}
