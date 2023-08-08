import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 500px, 500px, 250px, 250px, 250px, 250px, 500px, 500px, 500px, 501px
*/
export const FIXTURE_SLIDES_TO_SCROLL_LTR_1: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 0,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 500,
      bottom: 0,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 500,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 1000,
      bottom: 0,
      left: 500,
      toJSON: () => undefined
    },
    {
      x: 1000,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: 1250,
      bottom: 0,
      left: 1000,
      toJSON: () => undefined
    },
    {
      x: 1250,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: 1500,
      bottom: 0,
      left: 1250,
      toJSON: () => undefined
    },
    {
      x: 1500,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: 1750,
      bottom: 0,
      left: 1500,
      toJSON: () => undefined
    },
    {
      x: 1750,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: 2000,
      bottom: 0,
      left: 1750,
      toJSON: () => undefined
    },
    {
      x: 2000,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 2500,
      bottom: 0,
      left: 2000,
      toJSON: () => undefined
    },
    {
      x: 2500,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 3000,
      bottom: 0,
      left: 2500,
      toJSON: () => undefined
    },
    {
      x: 3000,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 3500,
      bottom: 0,
      left: 3000,
      toJSON: () => undefined
    },
    {
      x: 3500,
      y: 0,
      width: 501,
      height: 0,
      top: 0,
      right: 4001,
      bottom: 0,
      left: 3500,
      toJSON: () => undefined
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
  - Container width: 1000px
  - Slide widths: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
*/
export const FIXTURE_SLIDES_TO_SCROLL_LTR_2: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 20,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 500,
      bottom: 0,
      left: 20,
      toJSON: () => undefined
    },
    {
      x: 520,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 1000,
      bottom: 0,
      left: 520,
      toJSON: () => undefined
    },
    {
      x: 1020,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: 1255,
      bottom: 0,
      left: 1020,
      toJSON: () => undefined
    },
    {
      x: 1275,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: 1510,
      bottom: 0,
      left: 1275,
      toJSON: () => undefined
    },
    {
      x: 1530,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: 1765,
      bottom: 0,
      left: 1530,
      toJSON: () => undefined
    },
    {
      x: 1785,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: 2020,
      bottom: 0,
      left: 1785,
      toJSON: () => undefined
    },
    {
      x: 2040,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 2520,
      bottom: 0,
      left: 2040,
      toJSON: () => undefined
    },
    {
      x: 2540,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 3020,
      bottom: 0,
      left: 2540,
      toJSON: () => undefined
    },
    {
      x: 3040,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 3520,
      bottom: 0,
      left: 3040,
      toJSON: () => undefined
    },
    {
      x: 3540,
      y: 0,
      width: 481,
      height: 0,
      top: 0,
      right: 4021,
      bottom: 0,
      left: 3540,
      toJSON: () => undefined
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
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 500px, 500px, 250px, 250px, 250px, 250px, 500px, 500px, 500px, 501px
*/
export const FIXTURE_SLIDES_TO_SCROLL_RTL_1: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 500,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 1000,
      bottom: 0,
      left: 500,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: 500,
      bottom: 0,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: -250,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: -250,
      toJSON: () => undefined
    },
    {
      x: -500,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: -250,
      bottom: 0,
      left: -500,
      toJSON: () => undefined
    },
    {
      x: -750,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: -500,
      bottom: 0,
      left: -750,
      toJSON: () => undefined
    },
    {
      x: -1000,
      y: 0,
      width: 250,
      height: 0,
      top: 0,
      right: -750,
      bottom: 0,
      left: -1000,
      toJSON: () => undefined
    },
    {
      x: -1500,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: -1000,
      bottom: 0,
      left: -1500,
      toJSON: () => undefined
    },
    {
      x: -2000,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: -1500,
      bottom: 0,
      left: -2000,
      toJSON: () => undefined
    },
    {
      x: -2500,
      y: 0,
      width: 500,
      height: 0,
      top: 0,
      right: -2000,
      bottom: 0,
      left: -2500,
      toJSON: () => undefined
    },
    {
      x: -3001,
      y: 0,
      width: 501,
      height: 0,
      top: 0,
      right: -2500,
      bottom: 0,
      left: -3001,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
   Fixture 4

  - Horizontal
  - RTL
  - Slide right margin: 20px, last slide left margin: 20px 
  - Container width: 1000px
  - Slide widths: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
*/
export const FIXTURE_SLIDES_TO_SCROLL_RTL_2: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 190,
    top: 0,
    right: 1000,
    bottom: 190,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 500,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 980,
      bottom: 0,
      left: 500,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: 480,
      bottom: 0,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: -255,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: -20,
      bottom: 0,
      left: -255,
      toJSON: () => undefined
    },
    {
      x: -510,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: -275,
      bottom: 0,
      left: -510,
      toJSON: () => undefined
    },
    {
      x: -765,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: -530,
      bottom: 0,
      left: -765,
      toJSON: () => undefined
    },
    {
      x: -1020,
      y: 0,
      width: 235,
      height: 0,
      top: 0,
      right: -785,
      bottom: 0,
      left: -1020,
      toJSON: () => undefined
    },
    {
      x: -1520,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: -1040,
      bottom: 0,
      left: -1520,
      toJSON: () => undefined
    },
    {
      x: -2020,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: -1540,
      bottom: 0,
      left: -2020,
      toJSON: () => undefined
    },
    {
      x: -2520,
      y: 0,
      width: 480,
      height: 0,
      top: 0,
      right: -2040,
      bottom: 0,
      left: -2520,
      toJSON: () => undefined
    },
    {
      x: -3021,
      y: 0,
      width: 481,
      height: 0,
      top: 0,
      right: -2540,
      bottom: 0,
      left: -3021,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 20
  }
}

/*
   Fixture 5

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 500px, 500px, 250px, 250px, 250px, 250px, 500px, 500px, 500px, 501px
*/
export const FIXTURE_SLIDES_TO_SCROLL_Y_1: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    top: 0,
    right: 1000,
    bottom: 1000,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      top: 0,
      right: 1000,
      bottom: 500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 500,
      width: 1000,
      height: 500,
      top: 500,
      right: 1000,
      bottom: 1000,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1000,
      width: 1000,
      height: 250,
      top: 1000,
      right: 1000,
      bottom: 1250,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1250,
      width: 1000,
      height: 250,
      top: 1250,
      right: 1000,
      bottom: 1500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1500,
      width: 1000,
      height: 250,
      top: 1500,
      right: 1000,
      bottom: 1750,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1750,
      width: 1000,
      height: 250,
      top: 1750,
      right: 1000,
      bottom: 2000,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 2000,
      width: 1000,
      height: 500,
      top: 2000,
      right: 1000,
      bottom: 2500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 2500,
      width: 1000,
      height: 500,
      top: 2500,
      right: 1000,
      bottom: 3000,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 3000,
      width: 1000,
      height: 500,
      top: 3000,
      right: 1000,
      bottom: 3500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 3500,
      width: 1000,
      height: 501,
      top: 3500,
      right: 1000,
      bottom: 4001,
      left: 0,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}

/*
   Fixture 6

  - Vertical
  - Slide top margin: 20px, last slide bottom margin: 20px 
  - Container height: 1000px
  - Slide heights: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
*/
export const FIXTURE_SLIDES_TO_SCROLL_Y_2: TestElementDimensionsType = {
  containerRect: {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    top: 0,
    right: 1000,
    bottom: 1000,
    left: 0,
    toJSON: () => undefined
  },
  slideRects: [
    {
      x: 0,
      y: 20,
      width: 1000,
      height: 480,
      top: 20,
      right: 1000,
      bottom: 500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 520,
      width: 1000,
      height: 480,
      top: 520,
      right: 1000,
      bottom: 1000,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1020,
      width: 1000,
      height: 235,
      top: 1020,
      right: 1000,
      bottom: 1255,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1275,
      width: 1000,
      height: 235,
      top: 1275,
      right: 1000,
      bottom: 1510,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1530,
      width: 1000,
      height: 235,
      top: 1530,
      right: 1000,
      bottom: 1765,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1785,
      width: 1000,
      height: 235,
      top: 1785,
      right: 1000,
      bottom: 2020,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 2040,
      width: 1000,
      height: 480,
      top: 2040,
      right: 1000,
      bottom: 2520,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 2540,
      width: 1000,
      height: 480,
      top: 2540,
      right: 1000,
      bottom: 3020,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 3040,
      width: 1000,
      height: 480,
      top: 3040,
      right: 1000,
      bottom: 3520,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 3540,
      width: 1000,
      height: 481,
      top: 3540,
      right: 1000,
      bottom: 4021,
      left: 0,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 20
  }
}
