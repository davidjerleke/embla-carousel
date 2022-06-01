import { SlidesToScroll } from '../components/SlidesToScroll'

const viewSize = 100
const slideSizesWithGaps = [80, 50, 50, 39, 85, 15, 10, 91, 9]
const slideSizesEmpty: [] = []

describe('SlidesToScroll', () => {
  describe('Group by slide sizes', () => {
    const slidesToScroll = SlidesToScroll(viewSize, slideSizesWithGaps, 'auto')

    test('Groups items into groups where slide sizes <= view size', () => {
      const groups = slidesToScroll.groupSlides(slideSizesWithGaps)
      expect(groups).toEqual([[80], [50, 50], [39], [85, 15], [10], [91, 9]])
    })

    test('Returns an empty array if an empty list is provided', () => {
      const groups = slidesToScroll.groupSlides(slideSizesEmpty)
      expect(groups).toEqual(slideSizesEmpty)
    })

    test('Does not throw when a slide size > view size', () => {
      const func = () => slidesToScroll.groupSlides([viewSize + 1])
      expect(func).not.toThrow()
    })
  })

  describe('Group by number', () => {
    const slidesToScroll = SlidesToScroll(viewSize, slideSizesWithGaps, 3)

    test('Groups items into groups that equal the size of the given number', () => {
      const groups = slidesToScroll.groupSlides(slideSizesWithGaps)
      expect(groups).toEqual([
        [80, 50, 50],
        [39, 85, 15],
        [10, 91, 9],
      ])
    })

    test('Groups items that does not add up evenly at the end', () => {
      const groups = slidesToScroll.groupSlides(slideSizesWithGaps.slice(0, -1))
      expect(groups).toEqual([
        [80, 50, 50],
        [39, 85, 15],
        [10, 91],
      ])
    })

    test('Returns an empty array if an empty list is provided', () => {
      const groups = slidesToScroll.groupSlides(slideSizesEmpty)
      expect(groups).toEqual(slideSizesEmpty)
    })
  })
})
