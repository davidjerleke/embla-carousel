import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- LTR
- No slide margins
*/
export const FIXTURE_BREAKPOINTS: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 800,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: 0
    },
    {
      offsetWidth: 400,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: 800
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: 1200
    },
    {
      offsetWidth: 500,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: 1400
    },
    {
      offsetWidth: 300,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: 1900
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}
