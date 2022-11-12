import CarouselDefault from '../SandboxFiles/CarouselDefault'

import {
  Wrapper as CarouselDefaultWrapper,
  ID as carouselDefaultID,
  OPTIONS as carouselDefaultOptions,
  SLIDES as carouselDefaultSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Default'
import {
  Wrapper as CarouselLoopWrapper,
  ID as carouselLoopID,
  OPTIONS as carouselLoopOptions,
  SLIDES as carouselLoopSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Loop'
import {
  Wrapper as CarouselRightToLeftWrapper,
  ID as carouselRightToLeftID,
  OPTIONS as carouselRightToLeftOptions,
  SLIDES as carouselRightToLeftSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/RightToLeft'
import {
  Wrapper as CarouselSlidesToScrollWrapper,
  ID as carouselSlidesToScrollID,
  OPTIONS as carouselSlidesToScrollOptions,
  SLIDES as carouselSlidesToScrollSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/SlidesToScroll'
import {
  Wrapper as CarouselDragFreeWrapper,
  ID as carouselDragFreeID,
  OPTIONS as carouselDragFreeOptions,
  SLIDES as carouselDragFreeSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/DragFree'
import {
  Wrapper as CarouselAlignWrapper,
  ID as carouselAlignID,
  OPTIONS as carouselAlignOptions,
  SLIDES as carouselAlignSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Align'
import {
  Wrapper as CarouselVariableWidthsWrapper,
  ID as carouselVariableWidthsID,
  OPTIONS as carouselVariableWidthsOptions,
  SLIDES as carouselVariableWidthsSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/VariableWidths'
import {
  Wrapper as CarouselYAxisWrapper,
  ID as carouselYAxisID,
  OPTIONS as carouselYAxisOptions,
  SLIDES as carouselYAxisSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/YAxis'

export const SandboxesBasic = () => {
  return (
    <>
      <h2 className="examples__h2">Default</h2>
      <CarouselDefaultWrapper className={carouselDefaultID}>
        <CarouselDefault
          slides={carouselDefaultSlides}
          options={carouselDefaultOptions}
        />
      </CarouselDefaultWrapper>

      <h2 className="examples__h2">Loop</h2>
      <CarouselLoopWrapper className={carouselLoopID}>
        <CarouselDefault
          slides={carouselLoopSlides}
          options={carouselLoopOptions}
        />
      </CarouselLoopWrapper>

      <h2 className="examples__h2">Right to left</h2>
      <CarouselRightToLeftWrapper className={carouselRightToLeftID} dir="rtl">
        <CarouselDefault
          slides={carouselRightToLeftSlides}
          options={carouselRightToLeftOptions}
        />
      </CarouselRightToLeftWrapper>

      <h2 className="examples__h2">Slides To Scroll</h2>
      <CarouselSlidesToScrollWrapper className={carouselSlidesToScrollID}>
        <CarouselDefault
          slides={carouselSlidesToScrollSlides}
          options={carouselSlidesToScrollOptions}
        />
      </CarouselSlidesToScrollWrapper>

      <h2 className="examples__h2">Drag Free</h2>
      <CarouselDragFreeWrapper className={carouselDragFreeID}>
        <CarouselDefault
          slides={carouselDragFreeSlides}
          options={carouselDragFreeOptions}
        />
      </CarouselDragFreeWrapper>

      <h2 className="examples__h2">Align</h2>
      <CarouselAlignWrapper className={carouselAlignID}>
        <CarouselDefault
          slides={carouselAlignSlides}
          options={carouselAlignOptions}
        />
      </CarouselAlignWrapper>

      <h2 className="examples__h2">Variable Widths</h2>
      <CarouselVariableWidthsWrapper className={carouselVariableWidthsID}>
        <CarouselDefault
          slides={carouselVariableWidthsSlides}
          options={carouselVariableWidthsOptions}
        />
      </CarouselVariableWidthsWrapper>

      <h2 className="examples__h2">Y-axis</h2>
      <CarouselYAxisWrapper className={carouselYAxisID}>
        <CarouselDefault
          slides={carouselYAxisSlides}
          options={carouselYAxisOptions}
        />
      </CarouselYAxisWrapper>
    </>
  )
}
