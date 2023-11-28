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
  - Container width: 1000px
  - Slide widths: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
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
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 500px, 500px, 250px, 250px, 250px, 250px, 500px, 500px, 500px, 501px
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
   Fixture 4

  - Horizontal
  - RTL
  - Slide right margin: 20px, last slide left margin: 20px 
  - Container width: 1000px
  - Slide widths: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
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
   Fixture 5

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 500px, 500px, 250px, 250px, 250px, 250px, 500px, 500px, 500px, 501px
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
   Fixture 6

  - Vertical
  - Slide top margin: 20px, last slide bottom margin: 20px 
  - Container height: 1000px
  - Slide heights: 480px, 480px, 235px, 235px, 235px, 235px, 480px, 480px, 480px, 481px
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
