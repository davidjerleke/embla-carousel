import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_LTR_1: TestElementDimensionsType = {
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
      width: 100,
      height: 190,
      top: 0,
      right: 100,
      bottom: 190,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 100,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 300,
      bottom: 190,
      left: 100,
      toJSON: () => undefined
    },
    {
      x: 300,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 450,
      bottom: 190,
      left: 300,
      toJSON: () => undefined
    },
    {
      x: 450,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 700,
      bottom: 190,
      left: 450,
      toJSON: () => undefined
    },
    {
      x: 700,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 830,
      bottom: 190,
      left: 700,
      toJSON: () => undefined
    },
    {
      x: 830,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 930,
      bottom: 190,
      left: 830,
      toJSON: () => undefined
    },
    {
      x: 930,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 1130,
      bottom: 190,
      left: 930,
      toJSON: () => undefined
    },
    {
      x: 1130,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 1280,
      bottom: 190,
      left: 1130,
      toJSON: () => undefined
    },
    {
      x: 1280,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 1530,
      bottom: 190,
      left: 1280,
      toJSON: () => undefined
    },
    {
      x: 1530,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 1660,
      bottom: 190,
      left: 1530,
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
  - Slide left margin: 10px, Slide right margin: 10px 
  - Container width: 1000px
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_LTR_2: TestElementDimensionsType = {
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
      x: 10,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 110,
      bottom: 190,
      left: 10,
      toJSON: () => undefined
    },
    {
      x: 130,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 330,
      bottom: 190,
      left: 130,
      toJSON: () => undefined
    },
    {
      x: 350,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 500,
      bottom: 190,
      left: 350,
      toJSON: () => undefined
    },
    {
      x: 520,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 770,
      bottom: 190,
      left: 520,
      toJSON: () => undefined
    },
    {
      x: 790,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 920,
      bottom: 190,
      left: 790,
      toJSON: () => undefined
    },
    {
      x: 940,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 1040,
      bottom: 190,
      left: 940,
      toJSON: () => undefined
    },
    {
      x: 1060,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 1260,
      bottom: 190,
      left: 1060,
      toJSON: () => undefined
    },
    {
      x: 1280,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 1430,
      bottom: 190,
      left: 1280,
      toJSON: () => undefined
    },
    {
      x: 1450,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 1700,
      bottom: 190,
      left: 1450,
      toJSON: () => undefined
    },
    {
      x: 1720,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 1850,
      bottom: 190,
      left: 1720,
      toJSON: () => undefined
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
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_1: TestElementDimensionsType = {
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
      x: 900,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 1000,
      bottom: 190,
      left: 900,
      toJSON: () => undefined
    },
    {
      x: 700,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 900,
      bottom: 190,
      left: 700,
      toJSON: () => undefined
    },
    {
      x: 550,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 700,
      bottom: 190,
      left: 550,
      toJSON: () => undefined
    },
    {
      x: 300,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 550,
      bottom: 190,
      left: 300,
      toJSON: () => undefined
    },
    {
      x: 170,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 300,
      bottom: 190,
      left: 170,
      toJSON: () => undefined
    },
    {
      x: 70,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 170,
      bottom: 190,
      left: 70,
      toJSON: () => undefined
    },
    {
      x: -130,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 70,
      bottom: 190,
      left: -130,
      toJSON: () => undefined
    },
    {
      x: -280,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: -130,
      bottom: 190,
      left: -280,
      toJSON: () => undefined
    },
    {
      x: -530,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: -280,
      bottom: 190,
      left: -530,
      toJSON: () => undefined
    },
    {
      x: -660,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: -530,
      bottom: 190,
      left: -660,
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
  - Slide left margin: 10px, Slide right margin: 10px 
  - Container width: 1000px
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_2: TestElementDimensionsType = {
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
      x: 890,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 990,
      bottom: 190,
      left: 890,
      toJSON: () => undefined
    },
    {
      x: 670,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 870,
      bottom: 190,
      left: 670,
      toJSON: () => undefined
    },
    {
      x: 500,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: 650,
      bottom: 190,
      left: 500,
      toJSON: () => undefined
    },
    {
      x: 230,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: 480,
      bottom: 190,
      left: 230,
      toJSON: () => undefined
    },
    {
      x: 80,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: 210,
      bottom: 190,
      left: 80,
      toJSON: () => undefined
    },
    {
      x: -40,
      y: 0,
      width: 100,
      height: 190,
      top: 0,
      right: 60,
      bottom: 190,
      left: -40,
      toJSON: () => undefined
    },
    {
      x: -260,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: -60,
      bottom: 190,
      left: -260,
      toJSON: () => undefined
    },
    {
      x: -430,
      y: 0,
      width: 150,
      height: 190,
      top: 0,
      right: -280,
      bottom: 190,
      left: -430,
      toJSON: () => undefined
    },
    {
      x: -700,
      y: 0,
      width: 250,
      height: 190,
      top: 0,
      right: -450,
      bottom: 190,
      left: -700,
      toJSON: () => undefined
    },
    {
      x: -850,
      y: 0,
      width: 130,
      height: 190,
      top: 0,
      right: -720,
      bottom: 190,
      left: -850,
      toJSON: () => undefined
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
  - Slide heights: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_1: TestElementDimensionsType = {
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
      height: 100,
      top: 0,
      right: 1000,
      bottom: 100,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 100,
      width: 1000,
      height: 200,
      top: 100,
      right: 1000,
      bottom: 300,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 300,
      width: 1000,
      height: 150,
      top: 300,
      right: 1000,
      bottom: 450,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 450,
      width: 1000,
      height: 250,
      top: 450,
      right: 1000,
      bottom: 700,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 700,
      width: 1000,
      height: 130,
      top: 700,
      right: 1000,
      bottom: 830,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 830,
      width: 1000,
      height: 100,
      top: 830,
      right: 1000,
      bottom: 930,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 930,
      width: 1000,
      height: 200,
      top: 930,
      right: 1000,
      bottom: 1130,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1130,
      width: 1000,
      height: 150,
      top: 1130,
      right: 1000,
      bottom: 1280,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1280,
      width: 1000,
      height: 250,
      top: 1280,
      right: 1000,
      bottom: 1530,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1530,
      width: 1000,
      height: 130,
      top: 1530,
      right: 1000,
      bottom: 1660,
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
  - Slide top margin: 10px, Slide bottom margin: 10px 
  - Container height: 1000px
  - Slide heights: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_2: TestElementDimensionsType = {
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
      y: 10,
      width: 1000,
      height: 100,
      top: 10,
      right: 1000,
      bottom: 110,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 130,
      width: 1000,
      height: 200,
      top: 130,
      right: 1000,
      bottom: 330,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 350,
      width: 1000,
      height: 150,
      top: 350,
      right: 1000,
      bottom: 500,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 520,
      width: 1000,
      height: 250,
      top: 520,
      right: 1000,
      bottom: 770,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 790,
      width: 1000,
      height: 130,
      top: 790,
      right: 1000,
      bottom: 920,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 940,
      width: 1000,
      height: 100,
      top: 940,
      right: 1000,
      bottom: 1040,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1060,
      width: 1000,
      height: 200,
      top: 1060,
      right: 1000,
      bottom: 1260,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1280,
      width: 1000,
      height: 150,
      top: 1280,
      right: 1000,
      bottom: 1430,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1450,
      width: 1000,
      height: 250,
      top: 1450,
      right: 1000,
      bottom: 1700,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1720,
      width: 1000,
      height: 130,
      top: 1720,
      right: 1000,
      bottom: 1850,
      left: 0,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 10
  }
}
