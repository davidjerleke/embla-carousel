import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import CarouselDefault from 'components/Sandbox/React/SandboxFilesSrc/Default/EmblaCarousel'
import { InputRadioDefault } from 'components/Input/InputRadio'
import { InputCheckboxDefault } from 'components/Input/InputCheckbox'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { EmblaOptionsType } from 'embla-carousel-react'
import { createCarouselDefaultStyles } from 'components/Examples/createCarouselStyles'
import { Admonition } from 'components/Mdx/Components/Admonition'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { LAYERS } from 'consts/layers'
import { useCarouselGenerator } from 'hooks/useCarouselGenerator'
import { useInView } from 'react-intersection-observer'
import { SPACINGS } from 'consts/spacings'
import { CAROUSEL_GENERATOR_FORM_FIELDS } from 'consts/carouselGenerator'
import { FONT_SIZES } from 'consts/fontSizes'
import {
  carouselDefaultWrapperStyles,
  CAROUSEL_SLIDES_SPACING,
  CAROUSEL_WRAPPER_SPACING
} from 'components/Examples/carouselWrapperStyles'
import {
  CarouselGeneratorFormItem,
  CarouselGeneratorFormItems
} from './CarouselGeneratorFormItems'
import {
  CarouselGeneratorCheckboxType,
  CarouselGeneratorRadioType,
  createCarouselGeneratorInputId
} from 'utils/carouselGenerator'

const INPUT_ALIGN: CarouselGeneratorRadioType<'align'> = {
  ...createCarouselGeneratorInputId(CAROUSEL_GENERATOR_FORM_FIELDS.ALIGN),
  OPTIONS: [
    { LABEL: 'Start', VALUE: 'start' },
    { LABEL: 'Center', VALUE: 'center' },
    { LABEL: 'End', VALUE: 'end' }
  ]
}

const INPUT_CONTAIN_SCROLL: CarouselGeneratorCheckboxType<'containScroll'> = {
  ...createCarouselGeneratorInputId(
    CAROUSEL_GENERATOR_FORM_FIELDS.CONTAIN_SCROLL
  ),
  LABEL: 'Clear leading and trailing space'
}

const SLIDES = arrayFromNumber(5)
const CAROUSEL_ALIGN_ID = `${INPUT_ALIGN.ID}-demo`

const CAROUSEL_STYLES = createCarouselDefaultStyles('60%')

const CarouselWrapper = styled.div<{
  $showContainScroll: boolean
  $align: EmblaOptionsType['align']
}>`
  ${carouselDefaultWrapperStyles};

  &.${CAROUSEL_ALIGN_ID} {
    ${CAROUSEL_STYLES};
    margin-bottom: ${SPACINGS.FOUR};
    position: relative;

      ${({ $showContainScroll, $align }) =>
        $showContainScroll &&
        css`
          .embla__slide:first-child,
          .embla__slide:last-child {
            position: relative;

            &:before {
              top: 0;
              bottom: 0;
              position: absolute;
              font-size: ${FONT_SIZES.CUSTOM(() => 1.3)};
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              width: calc(100% / 3);
            }
          }

          .embla__slide:first-child {
            &:before {
              content: 'Leading space';
              right: calc(100% - ${CAROUSEL_SLIDES_SPACING});
              ${$align === 'start' &&
              css`
                display: none;
              `}
            }
          }

          .embla__slide:last-child {
            &:before {
              content: 'Trailing space';
              left: 100%;
              ${$align === 'end' &&
              css`
                display: none;
              `}
            }
          }
        `};
    }
  }
`

const AlignmentMarker = styled.div<{
  $align: EmblaOptionsType['align']
}>`
  &:before {
    ${BRAND_GRADIENT_BACKGROUND_STYLES};
    width: ${BORDER_SIZES.ACCENT_VERTICAL};
    top: calc(${CAROUSEL_WRAPPER_SPACING} / 2);
    bottom: calc(${CAROUSEL_WRAPPER_SPACING} / 2);
    z-index: ${LAYERS.STEP};
    opacity: 0.7;
    position: absolute;
    content: '';
    display: block;
    border-radius: ${BORDER_RADIUSES.LINE};

    ${({ $align }) => {
      if ($align === 'start') {
        return css`
          left: ${CAROUSEL_WRAPPER_SPACING};
        `
      }
      if ($align === 'end') {
        return css`
          right: ${CAROUSEL_WRAPPER_SPACING};
        `
      }
      return css`
        left: 50%;
        margin-left: calc(-${BORDER_SIZES.ACCENT_VERTICAL} / 2);
      `
    }};
`

export const CarouselGeneratorAlignmentSettings = () => {
  const { formData, onCheckboxChange, onRadioChange } = useCarouselGenerator()
  const [inViewRef, inView] = useInView()
  const slideSize = formData[CAROUSEL_GENERATOR_FORM_FIELDS.SLIDE_SIZE]
  const loop = formData[CAROUSEL_GENERATOR_FORM_FIELDS.LOOP]
  const dragFree = formData[CAROUSEL_GENERATOR_FORM_FIELDS.DRAG_FREE]
  const align = formData[INPUT_ALIGN.FIELD_NAME]
  const containScroll = formData[INPUT_CONTAIN_SCROLL.FIELD_NAME]
    ? 'trimSnaps'
    : false
  const [options, setOptions] = useState<EmblaOptionsType>({
    align,
    containScroll,
    loop,
    dragFree
  })

  useEffect(() => {
    setOptions({
      align,
      containScroll,
      loop,
      dragFree
    })
  }, [loop, dragFree, align, containScroll])

  return (
    <>
      {slideSize === '100' && (
        <Admonition type="note">
          Aligment settings will only <strong>work</strong> for carousels with{' '}
          slide sizes <strong>less than 100%</strong>.
        </Admonition>
      )}
      <CarouselWrapper
        className={CAROUSEL_ALIGN_ID}
        ref={inViewRef}
        $showContainScroll={!containScroll && !loop}
        $align={align}
      >
        {inView ? (
          <>
            <CarouselDefault slides={SLIDES} options={options} />
            <AlignmentMarker $align={align} />
          </>
        ) : null}
      </CarouselWrapper>

      <CarouselGeneratorFormItems role="radiogroup" aria-label={INPUT_ALIGN.ID}>
        {INPUT_ALIGN.OPTIONS.map(({ VALUE, LABEL }) => (
          <div key={VALUE}>
            <InputRadioDefault
              name={INPUT_ALIGN.FIELD_NAME}
              id={`${INPUT_ALIGN.ID}-${VALUE}`}
              value={VALUE}
              checked={formData[INPUT_ALIGN.FIELD_NAME] === VALUE}
              onChange={onRadioChange}
            >
              {LABEL}
            </InputRadioDefault>
          </div>
        ))}
      </CarouselGeneratorFormItems>

      {!loop && (
        <CarouselGeneratorFormItem>
          <InputCheckboxDefault
            name={INPUT_CONTAIN_SCROLL.FIELD_NAME}
            id={INPUT_CONTAIN_SCROLL.ID}
            checked={formData[INPUT_CONTAIN_SCROLL.FIELD_NAME]}
            onChange={onCheckboxChange}
          >
            {INPUT_CONTAIN_SCROLL.LABEL}
          </InputCheckboxDefault>
        </CarouselGeneratorFormItem>
      )}
    </>
  )
}
