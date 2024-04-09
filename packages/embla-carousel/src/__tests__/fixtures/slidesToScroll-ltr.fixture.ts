import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- LTR
- No slide margins
*/
export const FIXTURE_SLIDES_TO_SCROLL_LTR_1: TestElementDimensionsType = {
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
      offsetLeft: 0
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 500
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1000
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1250
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1500
    },
    {
      offsetWidth: 250,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1750
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 2000
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 2500
    },
    {
      offsetWidth: 500,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 3000
    },
    {
      offsetWidth: 501,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 3500
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
- Slide left margin: 20px, last slide right margin: 20px 
*/
export const FIXTURE_SLIDES_TO_SCROLL_LTR_2: TestElementDimensionsType = {
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
      offsetLeft: 20
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 520
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1020
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1275
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1530
    },
    {
      offsetWidth: 235,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 1785
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 2040
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 2540
    },
    {
      offsetWidth: 480,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 3040
    },
    {
      offsetWidth: 481,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 3540
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 20
  }
}

/*
Fixture 3

- Horizontal
- LTR
- No slide margins
- Slides are wider than viewport
*/
export const FIXTURE_SLIDES_TO_SCROLL_LTR_3: TestElementDimensionsType = {
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
      offsetLeft: 0
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 576
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1152
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1728
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 2304
    },
    {
      offsetWidth: 576,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 2880
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}
