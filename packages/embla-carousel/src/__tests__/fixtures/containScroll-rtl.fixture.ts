import { TestElementDimensionsType } from '../mocks/testElements.mock'

/*
Fixture 1

- Horizontal
- RTL
- No slide margins
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
Fixture 2

- Horizontal
- RTL
- Slide left margin: 10px, Slide right margin: 10px 
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
Fixture 3

- Horizontal
- RTL
- No slide margins
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
Fixture 4

- Horizontal
- RTL
- No slide margins
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
Fixture 5

- Horizontal
- RTL
- No slide margins
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
Fixture 6

- Horizontal
- RTL
- No slide margins
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_6: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 646,
    offsetHeight: 190,
    offsetTop: 16,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 517
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 388
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 258
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 129
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -129
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -258
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -388
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -517
    },
    {
      offsetWidth: 129,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -646
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
- No slide margins
*/
export const FIXTURE_CONTAIN_SCROLL_RTL_7: TestElementDimensionsType = {
  containerOffset: {
    offsetWidth: 646,
    offsetHeight: 190,
    offsetTop: 16,
    offsetLeft: 0
  },
  slideOffsets: [
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 431
    },
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 215
    },
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: 0
    },
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -215
    },
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -431
    },
    {
      offsetWidth: 215,
      offsetHeight: 190,
      offsetTop: 0,
      offsetLeft: -646
    }
  ],
  endMargin: {
    property: 'marginLeft',
    value: 0
  }
}
