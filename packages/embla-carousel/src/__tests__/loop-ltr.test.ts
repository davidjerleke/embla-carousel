import EmblaCarousel from '../components/EmblaCarousel'
import { EngineType } from '../components/Engine'
import { mockTestElements } from './mocks'
import {
  FIXTURE_LOOP_LTR_1,
  FIXTURE_LOOP_LTR_2
} from './fixtures/loop-ltr.fixture'

export const scrollToLocationInstant = (
  engine: EngineType,
  location: number
): void => {
  engine.target.set(location)
  engine.scrollBody.useDuration(0)
  engine.animation.update()
  engine.animation.render(1)
}

describe('➡️  Loop - Horizontal LTR', () => {
  const WRAP_AROUND_JOINT_SAFETY = 0.1

  describe('Carousel with slides WITHOUT MARGINS has correct:', () => {
    const FIRST_SNAP_START = 0
    const LOOP_POINTS_START = [
      -660.5, -760.5, -960.5, -1110.5, -1360.5, -1490.5, -1590.5
    ]

    describe('Position when align is START and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'start'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_START + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-1659.89px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_START + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(0.09000000000000001px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is START and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'start'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[0])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[1])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[2])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[3])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[4])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[5])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[6])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(1660px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[0])
          scrollToLocationInstant(engine, LOOP_POINTS_START[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[1])
          scrollToLocationInstant(engine, LOOP_POINTS_START[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[2])
          scrollToLocationInstant(engine, LOOP_POINTS_START[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[3])
          scrollToLocationInstant(engine, LOOP_POINTS_START[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[4])
          scrollToLocationInstant(engine, LOOP_POINTS_START[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[5])
          scrollToLocationInstant(engine, LOOP_POINTS_START[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[6])
          scrollToLocationInstant(engine, LOOP_POINTS_START[6] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })

    const FIRST_SNAP_CENTER = 450
    const LOOP_POINTS_CENTER = [
      380.5, 130.5, 0.5, -660.5, -760.5, -960.5, -1110.5
    ]

    describe('Position when align is CENTER and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'center'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_CENTER + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-1209.8899999999999px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_CENTER + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(450.09000000000003px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is CENTER and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'center'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1660px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })

    const FIRST_SNAP_END = 900
    const LOOP_POINTS_END = [830.5, 730.5, 530.5, 380.5, 130.5, 0.5, -660.5]

    describe('Position when align is END and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'end'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_END + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-759.89px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_END + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(900.09px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is END and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_1), {
        loop: true,
        align: 'end'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[0])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[1])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[2])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[3])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[4])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[5])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[6])

          expect(slides[0].style.transform).toBe('translate3d(1660px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[0])
          scrollToLocationInstant(engine, LOOP_POINTS_END[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[1])
          scrollToLocationInstant(engine, LOOP_POINTS_END[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[2])
          scrollToLocationInstant(engine, LOOP_POINTS_END[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[3])
          scrollToLocationInstant(engine, LOOP_POINTS_END[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[4])
          scrollToLocationInstant(engine, LOOP_POINTS_END[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1660px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[5])
          scrollToLocationInstant(engine, LOOP_POINTS_END[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1660px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[6])
          scrollToLocationInstant(engine, LOOP_POINTS_END[6] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })
  })

  describe('Carousel with slides WITH MARGINS has correct:', () => {
    const FIRST_SNAP_START = -10
    const LOOP_POINTS_START = [
      -870.5, -990.5, -1210.5, -1380.5, -1650.5, -1800.5
    ]

    describe('Position when align is START and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'start'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_START + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-1869.89px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_START + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-9.91px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is START and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'start'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[0])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[1])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[2])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[3])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[4])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[5])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(1860px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[0])
          scrollToLocationInstant(engine, LOOP_POINTS_START[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[1])
          scrollToLocationInstant(engine, LOOP_POINTS_START[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[2])
          scrollToLocationInstant(engine, LOOP_POINTS_START[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[3])
          scrollToLocationInstant(engine, LOOP_POINTS_START[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[4])
          scrollToLocationInstant(engine, LOOP_POINTS_START[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[4].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_START[5])
          scrollToLocationInstant(engine, LOOP_POINTS_START[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[4].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })

    const FIRST_SNAP_CENTER = 440
    const LOOP_POINTS_CENTER = [
      430.5, 160.5, 10.5, -870.5, -990.5, -1210.5, -1380.5
    ]

    describe('Position when align is CENTER and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'center'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_CENTER + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-1419.8899999999999px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_CENTER + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(440.09000000000003px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is CENTER and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'center'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[1].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[2].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('6', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6])
          scrollToLocationInstant(engine, LOOP_POINTS_CENTER[6] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[1].style.transform).toBe('translate3d(1860px,0px,0px)')
          expect(slides[2].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[3].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })

    const FIRST_SNAP_END = 890
    const LOOP_POINTS_END = [820.5, 600.5, 430.5, 160.5, 10.5, -870.5]

    describe('Position when align is END and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'end'
      })
      const engine = emblaApi.internalEngine()

      test('Ahead of wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_END + WRAP_AROUND_JOINT_SAFETY + 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(-969.89px,0px,0px)'
        )
      })

      test('Just before wrap around location:', () => {
        scrollToLocationInstant(
          engine,
          FIRST_SNAP_END + WRAP_AROUND_JOINT_SAFETY - 0.01
        )

        expect(emblaApi.containerNode().style.transform).toBe(
          'translate3d(890.09px,0px,0px)'
        )
      })
    })

    describe('Slide positions when align is END and the carousel is scrolled:', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_LOOP_LTR_2), {
        loop: true,
        align: 'end'
      })
      const engine = emblaApi.internalEngine()
      const slides = emblaApi.slideNodes()

      describe('To loop point location:', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[0])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[1])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[2])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[3])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[4])

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[5])

          expect(slides[0].style.transform).toBe('translate3d(1860px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })

      describe('Just before loop point location (0.01px):', () => {
        test('0', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[0])
          scrollToLocationInstant(engine, LOOP_POINTS_END[0] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[5].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('1', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[1])
          scrollToLocationInstant(engine, LOOP_POINTS_END[1] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[6].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('2', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[2])
          scrollToLocationInstant(engine, LOOP_POINTS_END[2] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[7].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('3', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[3])
          scrollToLocationInstant(engine, LOOP_POINTS_END[3] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[8].style.transform).toBe('translate3d(-1860px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('4', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[4])
          scrollToLocationInstant(engine, LOOP_POINTS_END[4] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')

          expect(slides[9].style.transform).toBe('translate3d(-1860px,0px,0px)')
        })

        test('5', () => {
          scrollToLocationInstant(engine, LOOP_POINTS_END[5])
          scrollToLocationInstant(engine, LOOP_POINTS_END[5] + 0.01)

          expect(slides[0].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[5].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[6].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[7].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[8].style.transform).toBe('translate3d(0px,0px,0px)')
          expect(slides[9].style.transform).toBe('translate3d(0px,0px,0px)')
        })
      })
    })
  })
})
