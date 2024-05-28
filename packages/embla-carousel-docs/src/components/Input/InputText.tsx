import React, { PropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { FONT_SIZES } from 'consts/fontSizes'
import { LAYERS } from 'consts/layers'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { TAP_HIGHLIGHT_STYLES } from 'consts/tapHighlight'
import { KEY_NAVIGATING_STYLES } from 'consts/keyEvents'

const HEIGHT = SPACINGS.EIGHT
const SIDES_PADDING = SPACINGS.THREE
const INPUT_RADIUS = BORDER_RADIUSES.BOX

const InputTextWrapper = styled.span`
  height: ${HEIGHT};
  border-radius: ${INPUT_RADIUS};
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  background-color: ${COLORS.BACKGROUND_CODE};
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const labelActiveStyles = css`
  transform: translateY(calc(-100% / 2)) scale(0.8);
`

const Label = styled.label`
  z-index: ${LAYERS.STEP};
  left: ${SIDES_PADDING};
  color: ${COLORS.TEXT_LOW_CONTRAST};
  position: absolute;
  top: 0;
  pointer-events: none;
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  transform-origin: center left;
`

const labelTextActiveStyles = css`
  background-color: ${COLORS.BACKGROUND_CODE};
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
`

const LabelText = styled.span`
  padding-left: ${SPACINGS.ONE};
  padding-right: ${SPACINGS.ONE};
  border-radius: ${INPUT_RADIUS};
  z-index: ${LAYERS.STEP};
  display: flex;
  position: relative;
  align-items: center;
`

const Highlight = styled.span`
  ${BRAND_GRADIENT_BACKGROUND_STYLES};
  top: -${BORDER_SIZES.DETAIL};
  left: -${BORDER_SIZES.DETAIL};
  bottom: -${BORDER_SIZES.DETAIL};
  right: -${BORDER_SIZES.DETAIL};
  display: block;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  visibility: hidden;

  &:after {
    background-color: ${COLORS.BACKGROUND_CODE};
    border-radius: inherit;
    position: absolute;
    top: ${BORDER_SIZES.OUTLINE};
    left: ${BORDER_SIZES.OUTLINE};
    bottom: ${BORDER_SIZES.OUTLINE};
    right: ${BORDER_SIZES.OUTLINE};
    content: '';
  }
`

const Input = styled.input<{
  $isKeyNavigating: boolean
  $inputHasValue: boolean
}>`
  ${TAP_HIGHLIGHT_STYLES};
  ${KEY_NAVIGATING_STYLES};
  z-index: ${LAYERS.STEP};
  height: calc(100% - ${BORDER_SIZES.DETAIL} * 2);
  width: calc(100% - ${BORDER_SIZES.DETAIL} * 2);
  color: ${COLORS.TEXT_BODY};
  font-size: ${FONT_SIZES.BODY};
  padding: 0 ${SIDES_PADDING};
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
  border-radius: inherit;
  border: 0;

  &:focus + ${Highlight} + ${Label} {
    ${labelActiveStyles};

    > ${LabelText} {
      ${labelTextActiveStyles};
    }
  }

  &:focus + ${Highlight} {
    visibility: visible;
  }

  ${({ $inputHasValue }) =>
    $inputHasValue &&
    css`
      & + ${Highlight} + ${Label} {
        ${labelActiveStyles};

        > ${LabelText} {
          ${labelTextActiveStyles};
        }
      }
    `};
`

type PropType = PropsWithRef<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>

export const InputText = (props: PropType) => {
  const { children, className, ...restProps } = props
  const isKeyNavigating = useAppSelector(selectKeyNavigating)

  return (
    <InputTextWrapper className={className}>
      <Input
        $isKeyNavigating={isKeyNavigating}
        $inputHasValue={!!restProps.value}
        type="text"
        {...restProps}
      />
      <Highlight />
      <Label>
        <LabelText>{children}</LabelText>
      </Label>
    </InputTextWrapper>
  )
}
