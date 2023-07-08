import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import { ButtonBare } from 'components/Button/ButtonBare'
import { PAGE_FRAME_SPACING } from 'components/Page/PageFrame'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { MEDIA } from 'consts/breakpoints'
import { copyToClipboard } from 'utils/copyToClipboard'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { useKeyNavigating } from 'hooks/useKeyNavigating'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'
import {
  createScrollBarShadowStyles,
  SCROLL_BAR_SHADOW_SIZE
} from 'consts/scrollBars'

export const PRISM_FRAME_RADIUS = BORDER_RADIUSES.BOX
const COPY_CODE_TIMEOUT = 3000
const COPY_CODE_BUTTON_PADDING = SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)
const COPY_CODE_BUTTON_HEIGHT = SPACINGS.FOUR

const PrismSyntaxFrameWrapper = styled.div`
  position: relative;
  overflow: hidden;
  font-size: ${FONT_SIZES.CUSTOM(({ COMPLEMENTARY }) => COMPLEMENTARY - 0.04)};
  background-color: ${COLORS.BACKGROUND_CODE};

  ${MEDIA.MIN_XS} {
    border-radius: ${PRISM_FRAME_RADIUS};
    border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  }
  ${MEDIA.MAX_XS} {
    border-top: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
    border-bottom: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  }

  &:before,
  &:after {
    z-index: ${LAYERS.STEP};
    width: ${PAGE_FRAME_SPACING};
    display: block;
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
  }
  &:before {
    ${createScrollBarShadowStyles('left', COLORS.BACKGROUND_CODE)};
    left: -${SCROLL_BAR_SHADOW_SIZE};
  }
  &:after {
    ${createScrollBarShadowStyles('right', COLORS.BACKGROUND_CODE)};
    right: -${SCROLL_BAR_SHADOW_SIZE};
  }
`

const CopyCode = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 0;
`

const CopyCodeButton = styled(ButtonBare)`
  position: relative;
  z-index: ${LAYERS.STEP * 2};
  margin-right: calc(${PAGE_FRAME_SPACING} - ${COPY_CODE_BUTTON_PADDING});
  color: ${COLORS.TEXT_LOW_CONTRAST};
  padding: 0 ${COPY_CODE_BUTTON_PADDING};
  height: ${COPY_CODE_BUTTON_HEIGHT};
  line-height: ${COPY_CODE_BUTTON_HEIGHT};
  font-size: ${FONT_SIZES.DETAIL};
  align-items: center;

  &:before {
    content: '';
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${PRISM_FRAME_RADIUS};
    ${BRAND_GRADIENT_BACKGROUND_STYLES};
  }

  &:hover {
    color: ${COLORS.BACKGROUND_SITE};
    &:before {
      visibility: visible;
    }
  }

  @media (hover: none), (hover: on-demand) {
    &:hover {
      color: ${COLORS.TEXT_LOW_CONTRAST};
      &:before {
        display: none;
      }
    }
  }
`

const ButtonStatus = styled.span`
  ${visuallyHiddenStyles};
`

const ButtonText = styled.span`
  position: relative;
  z-index: ${LAYERS.STEP};
`

type PropType = PropsWithChildren<{ code: string }>

export const PrismSyntaxFrame = (props: PropType) => {
  const { children, code } = props
  const { isKeyNavigating } = useKeyNavigating()
  const [isCopied, setIsCopied] = useState(false)
  const timeout = useRef(0)

  const onButtonClick = useCallback(() => {
    copyToClipboard(code)
    setIsCopied(true)
    timeout.current = window.setTimeout(
      () => setIsCopied(false),
      COPY_CODE_TIMEOUT
    )
  }, [code, setIsCopied])

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current)
    }
  }, [])

  return (
    <PrismSyntaxFrameWrapper $isKeyNavigating={isKeyNavigating}>
      <CopyCode>
        <CopyCodeButton
          aria-label="Copy code snippet to clipboard"
          onClick={onButtonClick}
          disabled={isCopied}
          type="button"
        >
          <ButtonStatus aria-roledescription="status">
            {isCopied
              ? 'Code snipped copied to clipboard'
              : 'Copy code snippet to clipboard'}
          </ButtonStatus>
          <ButtonText>{isCopied ? 'Copied' : 'Copy'}</ButtonText>
        </CopyCodeButton>
      </CopyCode>
      {children}
    </PrismSyntaxFrameWrapper>
  )
}
