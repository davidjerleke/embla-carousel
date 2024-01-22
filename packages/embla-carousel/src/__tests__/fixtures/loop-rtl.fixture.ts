import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- RTL
- No slide margins
*/
export const FIXTURE_LOOP_RTL_1: TestElementDimensionsType = {
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
      offsetLeft: 900
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 700
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 550
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 300
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 170
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 70
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -130
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -280
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -530
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -660
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
Fixture 2

- Horizontal
- RTL
- Slide left margin: 10px, Slide right margin: 10px
*/
export const FIXTURE_LOOP_RTL_2: TestElementDimensionsType = {
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
      offsetLeft: 890
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 670
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 500
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 230
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 80
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -40
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -260
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -430
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -700
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -850
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 10
  }
}
