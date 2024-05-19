import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- LTR
- No slide margins
*/
export const SCROLL_BOUNDS_LTR_1: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 100
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 300
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 450
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 700
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 830
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 930
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1130
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1280
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1530
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}
