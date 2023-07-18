import { Axis } from '../components/Axis'
import { Direction, DirectionOptionType } from '../components/Direction'
import {
  SlidesToScroll,
  SlidesToScrollOptionType,
  SlidesToScrollType
} from '../components/SlidesToScroll'
import { arrayKeys } from '../components/utils'

const containerRect = <DOMRect>{
  top: 196.3984375,
  right: 690,
  bottom: 386.3984375,
  left: 102
}

const slideRectsLtr = <DOMRect[]>[
  {
    top: 196.3984375,
    right: 411,
    bottom: 386.3984375,
    left: 122
  },
  {
    top: 196.3984375,
    right: 710,
    bottom: 386.3984375,
    left: 421
  },
  {
    top: 196.3984375,
    right: 1009,
    bottom: 386.3984375,
    left: 720
  },
  {
    top: 196.3984375,
    right: 1328,
    bottom: 386.3984375,
    left: 1039
  },
  {
    top: 196.3984375,
    right: 1627,
    bottom: 386.3984375,
    left: 1338
  },
  {
    top: 196.3984375,
    right: 1926,
    bottom: 386.3984375,
    left: 1637
  },
  {
    top: 196.3984375,
    right: 2245,
    bottom: 386.3984375,
    left: 1956
  },
  {
    top: 196.3984375,
    right: 2544,
    bottom: 386.3984375,
    left: 2255
  },
  {
    top: 196.3984375,
    right: 2843,
    bottom: 386.3984375,
    left: 2554
  },
  {
    top: 196.3984375,
    right: 3172,
    bottom: 386.3984375,
    left: 2883
  }
]

const slideRectsRtl = <DOMRect[]>[
  {
    top: 196.3984375,
    right: 670,
    bottom: 386.3984375,
    left: 381
  },
  {
    top: 196.3984375,
    right: 371,
    bottom: 386.3984375,
    left: 82
  },
  {
    top: 196.3984375,
    right: 72,
    bottom: 386.3984375,
    left: -217
  },
  {
    top: 196.3984375,
    right: -247,
    bottom: 386.3984375,
    left: -536
  },
  {
    top: 196.3984375,
    right: -546,
    bottom: 386.3984375,
    left: -835
  },
  {
    top: 196.3984375,
    right: -845,
    bottom: 386.3984375,
    left: -1134
  },
  {
    top: 196.3984375,
    right: -1164,
    bottom: 386.3984375,
    left: -1453
  },
  {
    top: 196.3984375,
    right: -1463,
    bottom: 386.3984375,
    left: -1752
  },
  {
    top: 196.3984375,
    right: -1762,
    bottom: 386.3984375,
    left: -2051
  },
  {
    top: 196.3984375,
    right: -2091,
    bottom: 386.3984375,
    left: -2380
  }
]

const slideIndexes = arrayKeys(slideRectsLtr)
const slideIndexesEmpty: [] = []
const groupCount = 3
const startGap = 20
const endGap = 20
const viewSize = 588

const createSlidesToScroll = (
  direction: DirectionOptionType = 'ltr',
  loop: boolean = false,
  slidesToScroll: SlidesToScrollOptionType = 'auto'
): SlidesToScrollType => {
  return SlidesToScroll(
    Axis('x', direction),
    Direction(direction),
    viewSize,
    slidesToScroll,
    loop,
    containerRect,
    direction === 'ltr' ? slideRectsLtr : slideRectsRtl,
    startGap,
    endGap
  )
}

describe('SlidesToScroll', () => {
  describe('Group by slide sizes', () => {
    describe('Ltr', () => {
      describe('Loop is disabled', () => {
        test('Groups items into groups where slide sizes <= view size', () => {
          const slidesToScroll = createSlidesToScroll()
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0], [1, 2], [3, 4], [5], [6, 7], [8], [9]])
        })
      })

      describe('Loop is enabled', () => {
        test('Groups items into groups where slide sizes <= view size', () => {
          const slidesToScroll = createSlidesToScroll('ltr', true)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1], [2], [3, 4], [5], [6, 7], [8], [9]])
        })
      })

      test('Returns an empty array if an empty list is provided', () => {
        const slidesToScroll = createSlidesToScroll()
        const groups = slidesToScroll.groupSlides(slideIndexesEmpty)

        expect(groups).toEqual(slideIndexesEmpty)
      })

      test('Does not throw when a slide size > view size', () => {
        const slidesToScroll = createSlidesToScroll()
        const func = () => slidesToScroll.groupSlides([viewSize + 1])

        expect(func).not.toThrow()
      })
    })

    describe('Rtl', () => {
      describe('Loop is disabled', () => {
        test('Groups items into groups where slide sizes <= view size', () => {
          const slidesToScroll = createSlidesToScroll('rtl')
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0], [1, 2], [3, 4], [5], [6, 7], [8], [9]])
        })
      })

      describe('Loop is enabled', () => {
        test('Groups items into groups where slide sizes <= view size', () => {
          const slidesToScroll = createSlidesToScroll('rtl', true)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1], [2], [3, 4], [5], [6, 7], [8], [9]])
        })
      })

      test('Returns an empty array if an empty list is provided', () => {
        const slidesToScroll = createSlidesToScroll('rtl')
        const groups = slidesToScroll.groupSlides(slideIndexesEmpty)

        expect(groups).toEqual(slideIndexesEmpty)
      })

      test('Does not throw when a slide size > view size', () => {
        const slidesToScroll = createSlidesToScroll('rtl')
        const func = () => slidesToScroll.groupSlides([viewSize + 1])

        expect(func).not.toThrow()
      })
    })
  })

  describe('Group by number', () => {
    describe('Ltr', () => {
      describe('Loop is disabled', () => {
        test('Groups items into groups that equal the size of the given number', () => {
          const slidesToScroll = createSlidesToScroll('ltr', false, groupCount)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
        })
      })

      describe('Loop is enabled', () => {
        test('Groups items into groups that equal the size of the given number', () => {
          const slidesToScroll = createSlidesToScroll('ltr', true, groupCount)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
        })
      })

      test('Returns an empty array if an empty list is provided', () => {
        const slidesToScroll = createSlidesToScroll('ltr', false, groupCount)
        const groups = slidesToScroll.groupSlides(slideIndexesEmpty)

        expect(groups).toEqual(slideIndexesEmpty)
      })
    })

    describe('Rtl', () => {
      describe('Loop is disabled', () => {
        test('Groups items into groups that equal the size of the given number', () => {
          const slidesToScroll = createSlidesToScroll('rtl', false, groupCount)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
        })
      })

      describe('Loop is enabled', () => {
        test('Groups items into groups that equal the size of the given number', () => {
          const slidesToScroll = createSlidesToScroll('rtl', true, groupCount)
          const groups = slidesToScroll.groupSlides(slideIndexes)

          expect(groups).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8], [9]])
        })
      })

      test('Returns an empty array if an empty list is provided', () => {
        const slidesToScroll = createSlidesToScroll('rtl', false, groupCount)
        const groups = slidesToScroll.groupSlides(slideIndexesEmpty)

        expect(groups).toEqual(slideIndexesEmpty)
      })
    })
  })
})
