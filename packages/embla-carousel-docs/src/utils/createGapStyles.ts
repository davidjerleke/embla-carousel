import {
  css,
  FlattenSimpleInterpolation,
  StyledComponent
} from 'styled-components'

export const createGapStyles = <
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>
>(
  gapX?: string | null,
  gapY?: string | null,
  gapItem:
    | '*'
    | keyof JSX.IntrinsicElements
    | StyledComponent<T, any, {}, never> = '*'
): FlattenSimpleInterpolation => {
  return css`
    ${gapX &&
    css`
      margin-left: -${gapX};
      > ${gapItem} {
        padding-left: ${gapX};
      }
    `}

    ${gapY &&
    css`
      margin-bottom: -${gapY};

      > ${gapItem} {
        padding-bottom: ${gapY};
      }
    `}
  `
}
