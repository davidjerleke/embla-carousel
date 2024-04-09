import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Vertical
- No slide margins
*/
export const FIXTURE_SLIDES_TO_SCROLL_Y_1: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1250,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1750,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 2000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 2500,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 500,
      offsetTop: 3000,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 501,
      offsetTop: 3500,
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
- Slide top margin: 20px, last slide bottom margin: 20px 
*/
export const FIXTURE_SLIDES_TO_SCROLL_Y_2: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 480,
      offsetTop: 20,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 480,
      offsetTop: 520,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 235,
      offsetTop: 1020,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 235,
      offsetTop: 1275,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 235,
      offsetTop: 1530,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 235,
      offsetTop: 1785,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 480,
      offsetTop: 2040,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 480,
      offsetTop: 2540,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 480,
      offsetTop: 3040,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 481,
      offsetTop: 3540,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 20
  }
}

/*
Fixture 3

- Vertical
- No slide margins
- Slides are taller than viewport
*/
export const FIXTURE_SLIDES_TO_SCROLL_Y_3: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 480,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 228,
      offsetLeft: 0
    },
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 456,
      offsetLeft: 0
    },
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 684,
      offsetLeft: 0
    },
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 912,
      offsetLeft: 0
    },
    {
      offsetWidth: 480,
      offsetHeight: 228,
      offsetTop: 1140,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}
