import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { CarouselGeneratorSubmit } from './CarouselGeneratorSubmit'
import { CarouselGeneratorCarousel } from './CarouselGeneratorCarousel'
import { Icon } from 'components/Icon/Icon'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'
import { LAYERS } from 'consts/layers'
import { MEDIA } from 'consts/breakpoints'
import { PageFrame } from 'components/Page/PageFrame'
import { SPACINGS } from 'consts/spacings'
import { COLORS } from 'consts/themes'
import { BUTTON_SIZES } from 'consts/buttons'
import { BORDER_SIZES } from 'consts/border'
import { ButtonBare, ButtonBareText } from 'components/Button/ButtonBare'
import { MAIN_CONTENT_SPACING, sidebarStyles } from 'components/Page/PageGrid'

const PREVIEW_WRAPPER_MAX_WIDTH = '52rem'

const CarouselGeneratorPreviewWrapper = styled(PageFrame)<{
  $previewLarge: boolean
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${LAYERS.HEADER};
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
`

const Preview = styled.div`
  width: ${PREVIEW_WRAPPER_MAX_WIDTH};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${MEDIA.DESKTOP} {
    margin-right: ${MAIN_CONTENT_SPACING};
  }
`

const SidebarPlaceholder = styled.div`
  ${sidebarStyles};
  flex: 0 0 auto;

  ${MEDIA.COMPACT} {
    display: none;
  }
`

const PreviewCarousel = styled(CarouselGeneratorCarousel)`
  pointer-events: auto;
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
  pointer-events: auto;

  ${ButtonBareText} {
    display: flex;
    align-items: center;
  }
`

const PreviewSizeButtonText = styled.span`
  ${visuallyHiddenStyles};
`

const SubmitButton = styled(CarouselGeneratorSubmit)`
  pointer-events: auto;
`

export const CarouselGeneratorPreview = () => {
  const [previewLarge, setPreviewLarge] = useState(false)

  const togglePreviewSize = useCallback(() => {
    setPreviewLarge((currentSize) => !currentSize)
  }, [])

  return (
    <CarouselGeneratorPreviewWrapper $previewLarge={previewLarge}>
      <Preview>
        <PreviewCarousel previewLarge={previewLarge} />

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
            <SubmitButton />
          </li>
        </ButtonsWrapper>
      </Preview>

      <SidebarPlaceholder />
    </CarouselGeneratorPreviewWrapper>
  )
}
