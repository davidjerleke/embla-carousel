import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- LTR
- No slide margins
*/
export const FIXTURE_ALIGN_LTR_1: TestElementDimensionsType = {
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

/*
Fixture 2

- Horizontal
- LTR
- Slide left margin: 10px, Slide right margin: 10px 
*/
export const FIXTURE_ALIGN_LTR_2: TestElementDimensionsType = {
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
      offsetLeft: 10
    },
    {
      offsetWidth: 400,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 830
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1250
    },
    {
      offsetWidth: 500,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1470
    },
    {
      offsetWidth: 300,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1990
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 10
  }
}
