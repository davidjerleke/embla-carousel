import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_EVENTS: TestElementDimensionsType = {
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
