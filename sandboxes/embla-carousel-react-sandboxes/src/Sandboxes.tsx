import React from 'react'
import CarouselDefault from './SandboxFiles/CarouselDefault'
import CarouselArrowsDots from './SandboxFiles/CarouselArrowsDots'
import CarouselThumbs from './SandboxFiles/CarouselThumbs'
import CarouselProgress from './SandboxFiles/CarouselProgress'
import CarouselParallax from './SandboxFiles/CarouselParallax'
import CarouselScale from './SandboxFiles/CarouselScale'
import CarouselOpacity from './SandboxFiles/CarouselOpacity'
import CarouselLazyLoad from './SandboxFiles/CarouselLazyLoad'
import CarouselAutoplay from './SandboxFiles/CarouselAutoplay'
import CarouselClassNames from './SandboxFiles/CarouselClassNames'
import CarouselInfiniteScroll from './SandboxFiles/CarouselInfiniteScroll'
import CarouselIosPicker from './SandboxFiles/CarouselIosPicker'

// Basic
import {
  Wrapper as CarouselDefaultWrapper,
  ID as carouselDefaultID,
  OPTIONS as carouselDefaultOptions,
  SLIDES as carouselDefaultSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/Default'
import {
  Wrapper as CarouselLoopWrapper,
  ID as carouselLoopID,
  OPTIONS as carouselLoopOptions,
  SLIDES as carouselLoopSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/Loop'
import {
  Wrapper as CarouselRightToLeftWrapper,
  ID as carouselRightToLeftID,
  OPTIONS as carouselRightToLeftOptions,
  SLIDES as carouselRightToLeftSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/RightToLeft'
import {
  Wrapper as CarouselSlidesToScrollWrapper,
  ID as carouselSlidesToScrollID,
  OPTIONS as carouselSlidesToScrollOptions,
  SLIDES as carouselSlidesToScrollSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/SlidesToScroll'
import {
  Wrapper as CarouselDragFreeWrapper,
  ID as carouselDragFreeID,
  OPTIONS as carouselDragFreeOptions,
  SLIDES as carouselDragFreeSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/DragFree'
import {
  Wrapper as CarouselAlignWrapper,
  ID as carouselAlignID,
  OPTIONS as carouselAlignOptions,
  SLIDES as carouselAlignSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/Align'
import {
  Wrapper as CarouselVariableWidthsWrapper,
  ID as carouselVariableWidthsID,
  OPTIONS as carouselVariableWidthsOptions,
  SLIDES as carouselVariableWidthsSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/VariableWidths'
import {
  Wrapper as CarouselYAxisWrapper,
  ID as carouselYAxisID,
  OPTIONS as carouselYAxisOptions,
  SLIDES as carouselYAxisSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Basic/YAxis'

// Navigation
import {
  Wrapper as CarouselArrowsDotsWrapper,
  ID as carouselArrowsDotsID,
  OPTIONS as carouselArrowsDotsOptions,
  SLIDES as carouselArrowsDotsSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Navigation/ArrowsDots'
import {
  Wrapper as CarouselThumbsWrapper,
  ID as carouselThumbsID,
  OPTIONS as carouselThumbsOptions,
  SLIDES as carouselThumbsSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Navigation/Thumbs'

// Tween
import {
  Wrapper as CarouselParallaxWrapper,
  ID as carouselParallaxID,
  OPTIONS as carouselParallaxOptions,
  SLIDES as carouselParallaxSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Tween/Parallax'
import {
  Wrapper as CarouselScaleWrapper,
  ID as carouselScaleID,
  OPTIONS as carouselScaleOptions,
  SLIDES as carouselScaleSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Tween/Scale'
import {
  Wrapper as CarouselOpacityWrapper,
  ID as carouselOpacityID,
  OPTIONS as carouselOpacityOptions,
  SLIDES as carouselOpacitySlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Tween/Opacity'

// Plugins
import {
  Wrapper as CarouselAutoplayWrapper,
  ID as carouselAutoplayID,
  OPTIONS as carouselAutoplayOptions,
  SLIDES as carouselAutoplaySlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Plugins/Autoplay'
import {
  Wrapper as CarouselClassNamesWrapper,
  ID as carouselClassNamesID,
  OPTIONS as carouselClassNamesOptions,
  SLIDES as carouselClassNamesSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Plugins/ClassNames'

// Miscellaneous
import {
  Wrapper as CarouselProgressWrapper,
  ID as carouselProgressID,
  OPTIONS as carouselProgressOptions,
  SLIDES as carouselProgressSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Miscellaneous/Progress'
import {
  Wrapper as CarouselLazyLoadWrapper,
  ID as carouselLazyLoadID,
  OPTIONS as carouselLazyLoadOptions,
  SLIDES as carouselLazyLoadSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Miscellaneous/LazyLoad'
import {
  Wrapper as CarouselInfiniteScrollWrapper,
  ID as carouselInfiniteScrollID,
  OPTIONS as carouselInfiniteScrollOptions,
  SLIDES as carouselInfiniteScrollSlides,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Miscellaneous/InfiniteScroll'
import {
  Wrapper as CarouselIosPickerWrapper,
  ID as carouselIosPickerID,
} from '../../../packages/embla-carousel-docs/src/components/Examples/Miscellaneous/IosPicker'

export const Sandboxes: React.FC = () => {
  return (
    <>
      <h2 className="examples__h2">Basic</h2>

      <h3 className="examples__h3">Default</h3>
      <CarouselDefaultWrapper className={carouselDefaultID}>
        <CarouselDefault
          slides={carouselDefaultSlides}
          options={carouselDefaultOptions}
        />
      </CarouselDefaultWrapper>

      <h3 className="examples__h3">Loop</h3>
      <CarouselLoopWrapper className={carouselLoopID}>
        <CarouselDefault
          slides={carouselLoopSlides}
          options={carouselLoopOptions}
        />
      </CarouselLoopWrapper>

      <h3 className="examples__h3">Right to left</h3>
      <CarouselRightToLeftWrapper className={carouselRightToLeftID} dir="rtl">
        <CarouselDefault
          slides={carouselRightToLeftSlides}
          options={carouselRightToLeftOptions}
        />
      </CarouselRightToLeftWrapper>

      <h3 className="examples__h3">Slides To Scroll</h3>
      <CarouselSlidesToScrollWrapper className={carouselSlidesToScrollID}>
        <CarouselDefault
          slides={carouselSlidesToScrollSlides}
          options={carouselSlidesToScrollOptions}
        />
      </CarouselSlidesToScrollWrapper>

      <h3 className="examples__h3">Drag Free</h3>
      <CarouselDragFreeWrapper className={carouselDragFreeID}>
        <CarouselDefault
          slides={carouselDragFreeSlides}
          options={carouselDragFreeOptions}
        />
      </CarouselDragFreeWrapper>

      <h3 className="examples__h3">Align</h3>
      <CarouselAlignWrapper className={carouselAlignID}>
        <CarouselDefault
          slides={carouselAlignSlides}
          options={carouselAlignOptions}
        />
      </CarouselAlignWrapper>

      <h3 className="examples__h3">Variable Widths</h3>
      <CarouselVariableWidthsWrapper className={carouselVariableWidthsID}>
        <CarouselDefault
          slides={carouselVariableWidthsSlides}
          options={carouselVariableWidthsOptions}
        />
      </CarouselVariableWidthsWrapper>

      <h3 className="examples__h3">Y-axis</h3>
      <CarouselYAxisWrapper className={carouselYAxisID}>
        <CarouselDefault
          slides={carouselYAxisSlides}
          options={carouselYAxisOptions}
        />
      </CarouselYAxisWrapper>

      <h2 className="examples__h2">Navigation</h2>

      <h3 className="examples__h3">Arrows & Dots</h3>
      <CarouselArrowsDotsWrapper className={carouselArrowsDotsID}>
        <CarouselArrowsDots
          slides={carouselArrowsDotsSlides}
          options={carouselArrowsDotsOptions}
        />
      </CarouselArrowsDotsWrapper>

      <h3 className="examples__h3">Thumbnails</h3>
      <CarouselThumbsWrapper className={carouselThumbsID}>
        <CarouselThumbs
          slides={carouselThumbsSlides}
          options={carouselThumbsOptions}
        />
      </CarouselThumbsWrapper>

      {/* Tweening */}
      <h2 className="examples__h2">Tweening</h2>

      <h3 className="examples__h3">Parallax</h3>
      <CarouselParallaxWrapper className={carouselParallaxID}>
        <CarouselParallax
          slides={carouselParallaxSlides}
          options={carouselParallaxOptions}
        />
      </CarouselParallaxWrapper>

      <h3 className="examples__h3">Scale</h3>
      <CarouselScaleWrapper className={carouselScaleID}>
        <CarouselScale
          slides={carouselScaleSlides}
          options={carouselScaleOptions}
        />
      </CarouselScaleWrapper>

      <h3 className="examples__h3">Opacity</h3>
      <CarouselOpacityWrapper className={carouselOpacityID}>
        <CarouselOpacity
          slides={carouselOpacitySlides}
          options={carouselOpacityOptions}
        />
      </CarouselOpacityWrapper>

      {/* Plugins */}
      <h2 className="examples__h2">Plugins</h2>

      <h3 className="examples__h3">Autoplay</h3>
      <CarouselAutoplayWrapper className={carouselAutoplayID}>
        <CarouselAutoplay
          slides={carouselAutoplaySlides}
          options={carouselAutoplayOptions}
        />
      </CarouselAutoplayWrapper>

      <h3 className="examples__h3">Class Names</h3>
      <CarouselClassNamesWrapper className={carouselClassNamesID}>
        <CarouselClassNames
          slides={carouselClassNamesSlides}
          options={carouselClassNamesOptions}
        />
      </CarouselClassNamesWrapper>

      {/* Miscellaneous */}
      <h2 className="examples__h2">Miscellaneous</h2>

      <h3 className="examples__h3">Progress</h3>
      <CarouselProgressWrapper className={carouselProgressID}>
        <CarouselProgress
          slides={carouselProgressSlides}
          options={carouselProgressOptions}
        />
      </CarouselProgressWrapper>

      <h3 className="examples__h3">Lazy Load</h3>
      <CarouselLazyLoadWrapper className={carouselLazyLoadID}>
        <CarouselLazyLoad
          slides={carouselLazyLoadSlides}
          options={carouselLazyLoadOptions}
        />
      </CarouselLazyLoadWrapper>

      <h3 className="examples__h3">Infinite Scroll</h3>
      <CarouselInfiniteScrollWrapper className={carouselInfiniteScrollID}>
        <CarouselInfiniteScroll
          slides={carouselInfiniteScrollSlides}
          options={carouselInfiniteScrollOptions}
        />
      </CarouselInfiniteScrollWrapper>

      <h3 className="examples__h3">IOS Picker Default</h3>
      <CarouselIosPickerWrapper className={carouselIosPickerID}>
        <CarouselIosPicker loop={false} />
      </CarouselIosPickerWrapper>

      <h3 className="examples__h3">IOS Picker Loop</h3>
      <CarouselIosPickerWrapper className={carouselIosPickerID}>
        <CarouselIosPicker loop={true} />
      </CarouselIosPickerWrapper>
    </>
  )
}
