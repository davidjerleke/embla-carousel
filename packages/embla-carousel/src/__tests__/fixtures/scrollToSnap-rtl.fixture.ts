import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- RTL
- No slide margins
*/
export const FIXTURE_SCROLL_TO_SNAP_RTL: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 500
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -250
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -500
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -750
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -1000
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -1500
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -2000
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -2500
    },
    {
      offsetWidth: 501,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -3001
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}
