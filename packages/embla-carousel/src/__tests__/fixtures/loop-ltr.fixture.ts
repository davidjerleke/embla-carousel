import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- LTR
- No slide margins
*/
export const FIXTURE_LOOP_LTR_1: TestElementDimensionsType = {
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

/*
Fixture 2

- Horizontal
- LTR
- Slide left margin: 10px, Slide right margin: 10px 
*/
export const FIXTURE_LOOP_LTR_2: TestElementDimensionsType = {
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
      offsetLeft: 10
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 130
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 350
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 520
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 790
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 940
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1060
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1280
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1450
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1720
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 10
  }
}
