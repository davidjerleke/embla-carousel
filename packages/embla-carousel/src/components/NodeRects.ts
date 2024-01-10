/**
 * This file provides functionality to measure and retrieve the bounding rectangle of an HTML element. It defines 'NodeRectType' for the structure of the rectangle data and 'NodeRectsType' for the object that includes the measurement method. The primary function, 'measure', calculates and returns the top, right, bottom, left, width, and height of a given HTML element.
 *
 * Functions:
 * - NodeRects(): Creates an object with a 'measure' method.
 * - measure(node): Takes an HTML element and returns its bounding rectangle data as a 'NodeRectType' object.
 *
 * Usage:
 * This module is essential for scenarios where precise layout measurements are required, such as dynamic positioning or size calculations in web interfaces.
 *
 * Note: Ensure that the node passed to the 'measure' function is rendered in the DOM to get accurate measurements.
 */

export type NodeRectType = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export type NodeRectsType = {
  measure: (node: HTMLElement) => NodeRectType
}

export function NodeRects(): NodeRectsType {
  function measure(node: HTMLElement): NodeRectType {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = node
    const offset: NodeRectType = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    }

    return offset
  }

  const self: NodeRectsType = {
    measure
  }
  return self
}
