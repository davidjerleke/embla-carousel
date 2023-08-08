import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
   Fixture 1

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_LTR_1: TestElementDimensionsType = {
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
      width: 800,
      height: 190,
      top: 0,
      right: 800,
      bottom: 190,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 800,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 1200,
      bottom: 190,
      left: 800,
      toJSON: () => undefined
    },
    {
      x: 1200,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 1400,
      bottom: 190,
      left: 1200,
      toJSON: () => undefined
    },
    {
      x: 1400,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: 1900,
      bottom: 190,
      left: 1400,
      toJSON: () => undefined
    },
    {
      x: 1900,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: 2200,
      bottom: 190,
      left: 1900,
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
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_LTR_2: TestElementDimensionsType = {
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
      width: 800,
      height: 190,
      top: 0,
      right: 810,
      bottom: 190,
      left: 10,
      toJSON: () => undefined
    },
    {
      x: 830,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 1230,
      bottom: 190,
      left: 830,
      toJSON: () => undefined
    },
    {
      x: 1250,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: 1450,
      bottom: 190,
      left: 1250,
      toJSON: () => undefined
    },
    {
      x: 1470,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: 1970,
      bottom: 190,
      left: 1470,
      toJSON: () => undefined
    },
    {
      x: 1990,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: 2290,
      bottom: 190,
      left: 1990,
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
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_RTL_1: TestElementDimensionsType = {
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
      x: 200,
      y: 0,
      width: 800,
      height: 190,
      top: 0,
      right: 1000,
      bottom: 190,
      left: 200,
      toJSON: () => undefined
    },
    {
      x: -200,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 200,
      bottom: 190,
      left: -200,
      toJSON: () => undefined
    },
    {
      x: -400,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: -200,
      bottom: 190,
      left: -400,
      toJSON: () => undefined
    },
    {
      x: -900,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: -400,
      bottom: 190,
      left: -900,
      toJSON: () => undefined
    },
    {
      x: -1200,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: -900,
      bottom: 190,
      left: -1200,
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
  - Slide widths: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_RTL_2: TestElementDimensionsType = {
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
      x: 190,
      y: 0,
      width: 800,
      height: 190,
      top: 0,
      right: 990,
      bottom: 190,
      left: 190,
      toJSON: () => undefined
    },
    {
      x: -230,
      y: 0,
      width: 400,
      height: 190,
      top: 0,
      right: 170,
      bottom: 190,
      left: -230,
      toJSON: () => undefined
    },
    {
      x: -450,
      y: 0,
      width: 200,
      height: 190,
      top: 0,
      right: -250,
      bottom: 190,
      left: -450,
      toJSON: () => undefined
    },
    {
      x: -970,
      y: 0,
      width: 500,
      height: 190,
      top: 0,
      right: -470,
      bottom: 190,
      left: -970,
      toJSON: () => undefined
    },
    {
      x: -1290,
      y: 0,
      width: 300,
      height: 190,
      top: 0,
      right: -990,
      bottom: 190,
      left: -1290,
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
  - Slide heights: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_Y_1: TestElementDimensionsType = {
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
      height: 800,
      top: 0,
      right: 1000,
      bottom: 800,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 800,
      width: 1000,
      height: 400,
      top: 800,
      right: 1000,
      bottom: 1200,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1200,
      width: 1000,
      height: 200,
      top: 1200,
      right: 1000,
      bottom: 1400,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1400,
      width: 1000,
      height: 500,
      top: 1400,
      right: 1000,
      bottom: 1900,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1900,
      width: 1000,
      height: 300,
      top: 1900,
      right: 1000,
      bottom: 2200,
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
  - Slide heights: 800px, 400px, 200px, 500px, 300px
*/
export const FIXTURE_ALIGN_Y_2: TestElementDimensionsType = {
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
      height: 800,
      top: 10,
      right: 1000,
      bottom: 810,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 830,
      width: 1000,
      height: 400,
      top: 830,
      right: 1000,
      bottom: 1230,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1250,
      width: 1000,
      height: 200,
      top: 1250,
      right: 1000,
      bottom: 1450,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1470,
      width: 1000,
      height: 500,
      top: 1470,
      right: 1000,
      bottom: 1970,
      left: 0,
      toJSON: () => undefined
    },
    {
      x: 0,
      y: 1990,
      width: 1000,
      height: 300,
      top: 1990,
      right: 1000,
      bottom: 2290,
      left: 0,
      toJSON: () => undefined
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 10
  }
}
