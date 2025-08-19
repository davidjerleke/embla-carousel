import React, { useMemo, useRef, ComponentPropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { SandboxGeneratorExample } from 'components/Sandbox/SandboxGeneratorExample'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { SANDBOX_GENERATOR_FORM_FIELDS } from 'consts/sandbox'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { EmblaOptionsType } from 'embla-carousel'
import { LAYERS } from 'consts/layers'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'components/Examples/examplesCarouselStyles'

const CAROUSEL_ID = 'carousel-generator-carousel'

const CarouselGeneratorCarouselWrapper = styled.div<{
  $carouselStyles: string
  $align: EmblaOptionsType['align']
  $direction: EmblaOptionsType['direction']
  $axis: EmblaOptionsType['axis']
  $slideSize: string
  $previewLarge: boolean
}>`
  transform: ${({ $previewLarge }) => `scale(${$previewLarge ? 1 : 0.52})`};
  transform-origin: bottom right;
  position: relative;
  width: 100%;
  justify-self: flex-end;
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  background-color: ${COLORS.BACKGROUND_SITE};
  padding: ${SPACINGS.THREE};
  border-radius: ${BORDER_RADIUSES.SOFT};

  &.${CAROUSEL_ID} {
    ${({ $carouselStyles }) =>
      css`
        ${$carouselStyles};
      `};

    .embla {
      max-width: none;
    }

    .embla__viewport {
      position: relative;

      &:before {
        display: ${({ $slideSize }) => {
          const fullWidthSlides = parseFloat($slideSize) === 100
          return fullWidthSlides ? 'none' : 'block'
        }};
        ${BRAND_GRADIENT_BACKGROUND_STYLES};
        z-index: ${LAYERS.STEP};
        opacity: 0.7;
        position: absolute;
        content: '';
        border-radius: ${BORDER_RADIUSES.LINE};

        ${({ $axis, $align, $direction }) => {
          if ($axis === 'x') {
            const baseStyles = css`
              width: ${BORDER_SIZES.ACCENT_VERTICAL};
              top: 0;
              bottom: 0;
            `

            if ($align === 'start') {
              const property = $direction === 'rtl' ? 'right' : 'left'
              return css`
                ${baseStyles};
                ${property}: 0;
              `
            }
            if ($align === 'end') {
              const property = $direction === 'rtl' ? 'left' : 'right'
              return css`
                ${baseStyles};
                ${property}: 0;
              `
            }
            return css`
              ${baseStyles};
              left: 50%;
              margin-left: calc(-${BORDER_SIZES.ACCENT_VERTICAL} / 2);
            `
          }

          if ($axis === 'y') {
            const basePositioning = css`
              height: ${BORDER_SIZES.ACCENT_VERTICAL};
              left: 0;
              right: 0;
            `

            if ($align === 'start') {
              return css`
                ${basePositioning};
                top: 0;
              `
            }
            if ($align === 'end') {
              return css`
                ${basePositioning};
                bottom: 0;
              `
            }
            return css`
              ${basePositioning};
              top: 50%;
              margin-top: calc(-${BORDER_SIZES.ACCENT_VERTICAL} / 2);
            `
          }
        }};
      }
    }

    .embla__slide__number,
    .embla__button,
    .embla__dot::after {
      background-color: ${COLORS.BACKGROUND_SITE};
    }
  }
`

type PropType = ComponentPropsWithRef<'div'> & {
  previewLarge: boolean
}

export const CarouselGeneratorCarousel = (props: PropType) => {
  const { previewLarge, className, ...restProps } = props
  const classNames = [className, CAROUSEL_ID].filter(Boolean).join(' ')
  const { formData } = useCarouselGenerator()
  const slideSize = formData[SANDBOX_GENERATOR_FORM_FIELDS.SLIDE_SIZE]
  const slideGapSize = formData[SANDBOX_GENERATOR_FORM_FIELDS.SLIDE_GAP_SIZE]
  const navigationDots = formData[SANDBOX_GENERATOR_FORM_FIELDS.NAVIGATION_DOTS]
  const navigationPrevNextButtons =
    formData[SANDBOX_GENERATOR_FORM_FIELDS.NAVIGATION_PREV_NEXT_BUTTONS]
  const axis = formData[SANDBOX_GENERATOR_FORM_FIELDS.AXIS]
  const slides = useRef(arrayFromNumber(5))

  const carouselStyles = useMemo(() => {
    return examplesCarouselStyles(
      `${slideSize}%`,
      `${parseInt(slideGapSize) / 10}rem`,
      axis,
      styledComponentsStylesToString(
        SLIDE_NUMBER_STYLES,
        CONTROLS_STYLES,
        ARROWS_STYLES,
        DOTS_STYLES
      )
    )
  }, [slideSize, slideGapSize, axis])

  return (
    <CarouselGeneratorCarouselWrapper
      $carouselStyles={carouselStyles}
      $align={formData.align}
      $direction={formData.direction}
      $slideSize={slideSize}
      $previewLarge={previewLarge}
      $axis={axis}
      className={classNames}
      {...restProps}
    >
      <SandboxGeneratorExample
        options={{
          loop: formData.loop,
          dragFree: formData.dragFree,
          containScroll: formData.containScroll,
          align: formData.align,
          direction: formData.direction,
          axis: formData.axis,
          slidesToScroll: formData.slidesToScroll
        }}
        slides={slides.current}
        navigationPrevNextButtons={navigationPrevNextButtons}
        navigationDots={navigationDots}
        autoplay={formData.autoplay}
      />
    </CarouselGeneratorCarouselWrapper>
  )
}
