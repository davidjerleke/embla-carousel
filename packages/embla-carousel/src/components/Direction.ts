/**
 * This file defines functionality for handling directional adjustments based on 'left-to-right' (ltr) or 'right-to-left' (rtl) options. It introduces 'DirectionOptionType' to specify the direction and 'DirectionType' for the object that contains the 'apply' method. The primary functionality is to modify a given number based on the specified direction, which is useful in contexts where directional considerations (like in UIs supporting multiple languages) affect positioning or movement.
 *
 * Functions:
 * - Direction(direction): Initializes a Direction object with a specified 'ltr' or 'rtl' direction.
 * - Apply(n): Adjusts a number by either keeping it the same (ltr) or negating it (rtl).
 *
 * Usage:
 * This module is particularly useful in user interfaces where components or layouts need to adapt based on text direction, especially in internationalization scenarios.
 *
 * Note: This module is intended to be used for HTML directional properties, see Axis.ts for slides direction.
 */

export type DirectionOptionType = 'ltr' | 'rtl'

export type DirectionType = {
  apply: (n: number) => number
}

export function Direction(direction: DirectionOptionType): DirectionType {
  const sign = direction === 'rtl' ? -1 : 1

  function apply(n: number): number {
    return n * sign
  }

  const self: DirectionType = {
    apply
  }
  return self
}
