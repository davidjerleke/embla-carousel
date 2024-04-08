import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- RTL
- No slide margins
*/
export const FIXTURE_SLIDES_TO_SCROLL_RTL_1: TestElementDimensionsType = {
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

/*
Fixture 2

- Horizontal
- RTL
- Slide right margin: 20px, last slide left margin: 20px 
*/
export const FIXTURE_SLIDES_TO_SCROLL_RTL_2: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 500
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -255
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -510
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -765
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -1020
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -1520
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -2020
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -2520
    },
    {
      offsetWidth: 481,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: -3021
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 20
  }
}

/*
Fixture 3

- Horizontal
- RTL
- No slide margins
- Slides are wider than viewport
*/
export const FIXTURE_SLIDES_TO_SCROLL_RTL_3: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 480,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -96
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -672
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -1248
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -1824
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -2400
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -2976
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}
