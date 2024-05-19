import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Vertical
- No slide margins
*/
export const SCROLL_BOUNDS_Y_1: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 100,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 300,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 450,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 700,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 830,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 930,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 1130,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1280,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 1530,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}
