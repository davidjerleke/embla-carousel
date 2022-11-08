import DefaultSandboxCarousel from '../SandboxFiles/DefaultSandboxCarousel'

import {
  Wrapper as ExampleCarouselDefaultWrapper,
  ID as exampleCarouselDefaultID,
  OPTIONS as exampleCarouselDefaultOptions,
  SLIDES as exampleCarouselDefaultSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Default'
import {
  Wrapper as ExampleCarouselLoopWrapper,
  ID as exampleCarouselLoopID,
  OPTIONS as exampleCarouselLoopOptions,
  SLIDES as exampleCarouselLoopSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Loop'
import {
  Wrapper as ExampleCarouselRightToLeftWrapper,
  ID as exampleCarouselRightToLeftID,
  OPTIONS as exampleCarouselRightToLeftOptions,
  SLIDES as exampleCarouselRightToLeftSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/RightToLeft'
import {
  Wrapper as ExampleCarouselSlidesToScrollWrapper,
  ID as exampleCarouselSlidesToScrollID,
  OPTIONS as exampleCarouselSlidesToScrollOptions,
  SLIDES as exampleCarouselSlidesToScrollSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/SlidesToScroll'
import {
  Wrapper as ExampleCarouselDragFreeWrapper,
  ID as exampleCarouselDragFreeID,
  OPTIONS as exampleCarouselDragFreeOptions,
  SLIDES as exampleCarouselDragFreeSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/DragFree'
import {
  Wrapper as ExampleCarouselAlignWrapper,
  ID as exampleCarouselAlignID,
  OPTIONS as exampleCarouselAlignOptions,
  SLIDES as exampleCarouselAlignSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/Align'
import {
  Wrapper as ExampleCarouselVariableWidthsWrapper,
  ID as exampleCarouselVariableWidthsID,
  OPTIONS as exampleCarouselVariableWidthsOptions,
  SLIDES as exampleCarouselVariableWidthsSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/VariableWidths'
import {
  Wrapper as ExampleCarouselYAxisWrapper,
  ID as exampleCarouselYAxisID,
  OPTIONS as exampleCarouselYAxisOptions,
  SLIDES as exampleCarouselYAxisSlides,
} from '../../../../packages/embla-carousel-docs/src/components/Examples/Basic/YAxis'

const ExamplesBasic = () => {
  return (
    <>
      <h1 className="examples__h1">Basic</h1>

      <h2 className="examples__h2">Default</h2>
      <ExampleCarouselDefaultWrapper id={exampleCarouselDefaultID}>
        <DefaultSandboxCarousel
          slides={exampleCarouselDefaultSlides}
          options={exampleCarouselDefaultOptions}
        />
      </ExampleCarouselDefaultWrapper>

      <h2 className="examples__h2">Loop</h2>
      <ExampleCarouselLoopWrapper id={exampleCarouselLoopID}>
        <DefaultSandboxCarousel
          slides={exampleCarouselLoopSlides}
          options={exampleCarouselLoopOptions}
        />
      </ExampleCarouselLoopWrapper>

      <h2 className="examples__h2">Right to left</h2>
      <ExampleCarouselRightToLeftWrapper
        id={exampleCarouselRightToLeftID}
        dir="rtl"
      >
        <DefaultSandboxCarousel
          slides={exampleCarouselRightToLeftSlides}
          options={exampleCarouselRightToLeftOptions}
        />
      </ExampleCarouselRightToLeftWrapper>

      <h2 className="examples__h2">Slides To Scroll</h2>
      <ExampleCarouselSlidesToScrollWrapper
        id={exampleCarouselSlidesToScrollID}
      >
        <DefaultSandboxCarousel
          slides={exampleCarouselSlidesToScrollSlides}
          options={exampleCarouselSlidesToScrollOptions}
        />
      </ExampleCarouselSlidesToScrollWrapper>

      <h2 className="examples__h2">Drag Free</h2>
      <ExampleCarouselDragFreeWrapper id={exampleCarouselDragFreeID}>
        <DefaultSandboxCarousel
          slides={exampleCarouselDragFreeSlides}
          options={exampleCarouselDragFreeOptions}
        />
      </ExampleCarouselDragFreeWrapper>

      <h2 className="examples__h2">Align</h2>
      <ExampleCarouselAlignWrapper id={exampleCarouselAlignID}>
        <DefaultSandboxCarousel
          slides={exampleCarouselAlignSlides}
          options={exampleCarouselAlignOptions}
        />
      </ExampleCarouselAlignWrapper>

      <h2 className="examples__h2">Variable Widths</h2>
      <ExampleCarouselVariableWidthsWrapper
        id={exampleCarouselVariableWidthsID}
      >
        <DefaultSandboxCarousel
          slides={exampleCarouselVariableWidthsSlides}
          options={exampleCarouselVariableWidthsOptions}
        />
      </ExampleCarouselVariableWidthsWrapper>

      <h2 className="examples__h2">Y-axis</h2>
      <ExampleCarouselYAxisWrapper id={exampleCarouselYAxisID}>
        <DefaultSandboxCarousel
          slides={exampleCarouselYAxisSlides}
          options={exampleCarouselYAxisOptions}
        />
      </ExampleCarouselYAxisWrapper>
    </>
  )
}

export default ExamplesBasic
