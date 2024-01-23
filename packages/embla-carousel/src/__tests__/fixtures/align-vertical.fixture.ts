import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Vertical
- No slide margins
*/
export const FIXTURE_ALIGN_Y_1: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 800,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 400,
      offsetTop: 800,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 1200,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 1400,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 300,
      offsetTop: 1900,
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
export const FIXTURE_ALIGN_Y_2: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 800,
      offsetTop: 10,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 400,
      offsetTop: 830,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 1250,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 1470,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 300,
      offsetTop: 1990,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 10
  }
}
