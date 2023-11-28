import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_LTR_1: TestElementDimensionsType = {
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
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_LTR_2: TestElementDimensionsType = {
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

/*
   Fixture 3

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_RTL_1: TestElementDimensionsType = {
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

      offsetLeft: 200
    },
    {
      offsetWidth: 400,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -200
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -400
    },
    {
      offsetWidth: 500,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -900
    },
    {
      offsetWidth: 300,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -1200
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
  - Slide left margin: 10px, Slide right margin: 10px 
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_RTL_2: TestElementDimensionsType = {
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

      offsetLeft: 190
    },
    {
      offsetWidth: 400,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -230
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -450
    },
    {
      offsetWidth: 500,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -970
    },
    {
      offsetWidth: 300,
      offsetHeight: 190,
      offsetTop: 0,

      offsetLeft: -1290
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 10
  }
}

/*
   Fixture 5

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_Y_1: TestElementDimensionsType = {
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
   Fixture 6

  - Vertical
  - Slide top margin: 10px, Slide bottom margin: 10px 
  - Container height: 1000px
  - Slide heights: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_SCROLL_PROGRESS_Y_2: TestElementDimensionsType = {
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
