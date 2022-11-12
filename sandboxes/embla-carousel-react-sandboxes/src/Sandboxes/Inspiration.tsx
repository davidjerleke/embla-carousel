import CarouselProgress from '../SandboxFiles/CarouselProgress'
import CarouselParallax from '../SandboxFiles/CarouselParallax'
import CarouselScale from '../SandboxFiles/CarouselScale'
import CarouselOpacity from '../SandboxFiles/CarouselOpacity'
import CarouselLazyLoad from '../SandboxFiles/CarouselLazyLoad'
import CarouselInfiniteScroll from '../SandboxFiles/CarouselInfiniteScroll'
import CarouselIosPicker from '../SandboxFiles/CarouselIosPicker'

import {
  Wrapper as CarouselProgressWrapper,
  ID as carouselProgressID,
  OPTIONS as carouselProgressOptions,
  SLIDES as carouselProgressSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/Progress'
import {
  Wrapper as CarouselParallaxWrapper,
  ID as carouselParallaxID,
  OPTIONS as carouselParallaxOptions,
  SLIDES as carouselParallaxSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/Parallax'
import {
  Wrapper as CarouselScaleWrapper,
  ID as carouselScaleID,
  OPTIONS as carouselScaleOptions,
  SLIDES as carouselScaleSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/Scale'
import {
  Wrapper as CarouselOpacityWrapper,
  ID as carouselOpacityID,
  OPTIONS as carouselOpacityOptions,
  SLIDES as carouselOpacitySlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/Opacity'
import {
  Wrapper as CarouselLazyLoadWrapper,
  ID as carouselLazyLoadID,
  OPTIONS as carouselLazyLoadOptions,
  SLIDES as carouselLazyLoadSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/LazyLoad'
import {
  Wrapper as CarouselInfiniteScrollWrapper,
  ID as carouselInfiniteScrollID,
  OPTIONS as carouselInfiniteScrollOptions,
  SLIDES as carouselInfiniteScrollSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/InfiniteScroll'
import {
  Wrapper as CarouselIosPickerWrapper,
  ID as carouselIosPickerID,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Inspiration/IosPicker'

export const SandboxesInspiration = () => {
  return (
    <>
      <h2 className="examples__h2">Progress</h2>
      <CarouselProgressWrapper className={carouselProgressID}>
        <CarouselProgress
          slides={carouselProgressSlides}
          options={carouselProgressOptions}
        />
      </CarouselProgressWrapper>

      <h2 className="examples__h2">Parallax</h2>
      <CarouselParallaxWrapper className={carouselParallaxID}>
        <CarouselParallax
          slides={carouselParallaxSlides}
          options={carouselParallaxOptions}
        />
      </CarouselParallaxWrapper>

      <h2 className="examples__h2">Scale</h2>
      <CarouselScaleWrapper className={carouselScaleID}>
        <CarouselScale
          slides={carouselScaleSlides}
          options={carouselScaleOptions}
        />
      </CarouselScaleWrapper>

      <h2 className="examples__h2">Opacity</h2>
      <CarouselOpacityWrapper className={carouselOpacityID}>
        <CarouselOpacity
          slides={carouselOpacitySlides}
          options={carouselOpacityOptions}
        />
      </CarouselOpacityWrapper>

      <h2 className="examples__h2">Lazy Load</h2>
      <CarouselLazyLoadWrapper className={carouselLazyLoadID}>
        <CarouselLazyLoad
          slides={carouselLazyLoadSlides}
          options={carouselLazyLoadOptions}
        />
      </CarouselLazyLoadWrapper>

      <h2 className="examples__h2">Infinite Scroll</h2>
      <CarouselInfiniteScrollWrapper className={carouselInfiniteScrollID}>
        <CarouselInfiniteScroll
          slides={carouselInfiniteScrollSlides}
          options={carouselInfiniteScrollOptions}
        />
      </CarouselInfiniteScrollWrapper>

      <h2 className="examples__h2">IOS Picker Default</h2>
      <CarouselIosPickerWrapper className={carouselIosPickerID}>
        <CarouselIosPicker loop={false} />
      </CarouselIosPickerWrapper>

      <h2 className="examples__h2">IOS Picker Loop</h2>
      <CarouselIosPickerWrapper className={carouselIosPickerID}>
        <CarouselIosPicker loop={true} />
      </CarouselIosPickerWrapper>
    </>
  )
}
