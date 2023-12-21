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
      offsetLeft: 0
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 100
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 300
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 450
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 700
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 830
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 930
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1130
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1280
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1530
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
      offsetLeft: 10
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 130
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 350
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 520
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 790
    },
    {
      offsetWidth: 100,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 940
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1060
    },
    {
      offsetWidth: 150,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1280
    },
    {
      offsetWidth: 250,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1450
    },
    {
      offsetWidth: 130,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 1720
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
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 501px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_LTR_3: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 501
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}

/*
   Fixture 4

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 502px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_LTR_4: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 502,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 502
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}

/*
   Fixture 5

  - Horizontal
  - LTR
  - No slide margins
  - Container width: 1000px
  - Slide widths: 200px, 200px
*/
export const FIXTURE_CONTAIN_SCROLL_LTR_5: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 200
    }
  ],
  endMargin: {
    property: 'marginRight',
    value: 0
  }
}

/*
   Fixture 6

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_1: TestElementDimensionsType = {
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
   Fixture 7

  - Horizontal
  - RTL
  - Slide left margin: 10px, Slide right margin: 10px 
  - Container width: 1000px
  - Slide widths: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_2: TestElementDimensionsType = {
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

/*
   Fixture 8

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 501px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_3: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 499
    },
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -2
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
   Fixture 9

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 502px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_4: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 502,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 498
    },
    {
      offsetWidth: 501,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -3
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
   Fixture 10

  - Horizontal
  - RTL
  - No slide margins
  - Container width: 1000px
  - Slide widths: 200px, 200px
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_5: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 190,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 800
    },
    {
      offsetWidth: 200,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 600
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}

/*
   Fixture 11

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_1: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 100,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 300,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 450,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 700,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 830,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 930,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 1130,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1280,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 1530,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}

/*
   Fixture 12

  - Vertical
  - Slide top margin: 10px, Slide bottom margin: 10px 
  - Container height: 1000px
  - Slide heights: 100px, 200px, 150px, 250px, 130px, 100px, 200px, 150px, 250px, 130px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_2: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 10,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 130,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 350,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 520,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 790,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 100,
      offsetTop: 940,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 1060,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 150,
      offsetTop: 1280,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 250,
      offsetTop: 1450,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 130,
      offsetTop: 1720,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 10
  }
}

/*
   Fixture 13

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 501px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_3: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 501,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 501,
      offsetTop: 501,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}

/*
   Fixture 14

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 502px, 501px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_4: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 502,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 501,
      offsetTop: 502,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}

/*
   Fixture 15

  - Vertical
  - No slide margins
  - Container height: 1000px
  - Slide heights: 200px, 200px
*/
export const FIXTURE_CONTAIN_SCROLL_Y_5: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 1000,
    offsetHeight: 1000,
    offsetTop: 0,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 1000,
      offsetHeight: 200,
      offsetTop: 200,
      offsetLeft: 0
    }
  ],
  endMargin: {
    property: 'marginBottom',
    value: 0
  }
}
