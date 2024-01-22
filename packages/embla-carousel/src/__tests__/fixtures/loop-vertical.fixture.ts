import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Vertical
- No slide margins
*/
export const FIXTURE_LOOP_Y_1: TestElementDimensionsType = {
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

/*
Fixture 2

- Vertical
- Slide top margin: 10px, Slide bottom margin: 10px 
*/
export const FIXTURE_LOOP_Y_2: TestElementDimensionsType = {
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
      offsetTop: 10,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 130,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 350,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 520,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 790,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 940,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 1060,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 1280,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1450,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 1720,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 10
  }
}
