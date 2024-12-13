import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Vertical
- No slide margins
*/
export const FIXTURE_SCROLL_TO_SNAP_Y: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1250,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1750,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 2000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 2500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 3000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 501,
      offsetTop: 3500,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}
