import CarouselArrowsDots from '../SandboxFiles/CarouselArrowsDots'
import CarouselThumbs from '../SandboxFiles/CarouselThumbs'

import {
  Wrapper as CarouselArrowsDotsWrapper,
  ID as carouselArrowsDotsID,
  OPTIONS as carouselArrowsDotsOptions,
  SLIDES as carouselArrowsDotsSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Navigation/ArrowsDots'
import {
  Wrapper as CarouselThumbsWrapper,
  ID as carouselThumbsID,
  OPTIONS as carouselThumbsOptions,
  SLIDES as carouselThumbsSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Navigation/Thumbs'

export const SandboxesNavigation = () => {
  return (
    <>
      <h2 className="examples__h2">Arrows & Dots</h2>
      <CarouselArrowsDotsWrapper className={carouselArrowsDotsID}>
        <CarouselArrowsDots
          slides={carouselArrowsDotsSlides}
          options={carouselArrowsDotsOptions}
        />
      </CarouselArrowsDotsWrapper>

      <h2 className="examples__h2">Thumbnails</h2>
      <CarouselThumbsWrapper className={carouselThumbsID}>
        <CarouselThumbs
          slides={carouselThumbsSlides}
          options={carouselThumbsOptions}
        />
      </CarouselThumbsWrapper>
    </>
  )
}
