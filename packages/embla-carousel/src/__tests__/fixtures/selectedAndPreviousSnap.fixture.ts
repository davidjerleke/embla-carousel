import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SELECTED_PREVIOUS_SNAP_LTR: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 0,
      y: 0,
      width: 800,
      height: 190,
      top: 0,
      right: 800,
      bottom: 190,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 800,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 1200,
      bottom: 190,
      left: 800,
      toJSON: () => undefined
    },
    {
      x: 1200,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 1400,
      bottom: 190,
      left: 1200,
      toJSON: () => undefined
    },
    {
      x: 1400,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: 1900,
      bottom: 190,
      left: 1400,
      toJSON: () => undefined
    },
    {
      x: 1900,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: 2200,
      bottom: 190,
      left: 1900,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}

/*
   Fixture 2

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SELECTED_PREVIOUS_SNAP_RTL: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 200,
      y: 0,
      width: 800,
      height: 190,
      top: 0,
      right: 1000,
      bottom: 190,
      left: 200,
      toJSON: () => undefined
    },
    {
      x: -200,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 200,
      bottom: 190,
      left: -200,
      toJSON: () => undefined
    },
    {
      x: -400,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: -200,
      bottom: 190,
      left: -400,
      toJSON: () => undefined
    },
    {
      x: -900,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: -400,
      bottom: 190,
      left: -900,
      toJSON: () => undefined
    },
    {
      x: -1200,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: -900,
      bottom: 190,
      left: -1200,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
   Fixture 3

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SELECTED_PREVIOUS_SNAP_Y: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    top: 0,
    right: 1000,
    bottom: 1000,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 0,
      y: 0,
      width: 1000,
      height: 800,
      top: 0,
      right: 1000,
      bottom: 800,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 800,
      width: 1000,
      height: 400,
      top: 800,
      right: 1000,
      bottom: 1200,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1200,
      width: 1000,
      height: 200,
      top: 1200,
      right: 1000,
      bottom: 1400,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1400,
      width: 1000,
      height: 500,
      top: 1400,
      right: 1000,
      bottom: 1900,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1900,
      width: 1000,
      height: 300,
      top: 1900,
      right: 1000,
      bottom: 2200,
      left: 0,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}
