import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- RTL
- No slide margins
*/
export const FIXTURE_AXIS_X_RTL: TestElementDimensionsType = {
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
      offsetLeft: 200
    },
    {
      offsetWidth: 400,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -200
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -400
    },
    {
      offsetWidth: 500,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -900
    },
    {
      offsetWidth: 300,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -1200
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}
