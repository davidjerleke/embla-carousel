import React, { JSX } from 'react'
import { css, type RuleSet, IStyledComponent } from 'styled-components'

// TODO: Fix types

export function createGapStyles<
  T extends keyof JSX.IntrinsicElements | React.ComponentType<any>
>(
  gapX?: string | null,
  gapY?: string | null,
  gapItem:
    | '*'
    | keyof JSX.IntrinsicElements
    | IStyledComponent<'web', any> = '*'
): RuleSet {
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
