"use strict";(self.webpackChunkembla_carousel_docs=self.webpackChunkembla_carousel_docs||[]).push([[107],{107:function(e,n,i){i.r(n),n.default="import React, { useCallback, useEffect, useState } from 'react'\nimport useEmblaCarousel, {\n  EmblaCarouselType,\n  EmblaOptionsType\n} from 'embla-carousel-react'\nimport { LazyLoadImage } from './EmblaCarouselLazyLoadImage'\nimport imageByIndex from '../imageByIndex'\n\ntype PropType = {\n  slides: number[]\n  options?: EmblaOptionsType\n}\n\nconst EmblaCarousel: React.FC<PropType> = (props) => {\n  const { slides, options } = props\n  const [emblaRed, emblaApi] = useEmblaCarousel(options)\n  const [slidesInView, setSlidesInView] = useState<number[]>([])\n\n  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {\n    setSlidesInView((slidesInView) => {\n      if (slidesInView.length === emblaApi.slideNodes().length) {\n        emblaApi.off('slidesInView', updateSlidesInView)\n      }\n      const inView = emblaApi\n        .slidesInView()\n        .filter((index) => !slidesInView.includes(index))\n      return slidesInView.concat(inView)\n    })\n  }, [])\n\n  useEffect(() => {\n    if (!emblaApi) return\n\n    updateSlidesInView(emblaApi)\n    emblaApi.on('slidesInView', updateSlidesInView)\n    emblaApi.on('reInit', updateSlidesInView)\n  }, [emblaApi, updateSlidesInView])\n\n  return (\n    <div className=\"embla\">\n      <div className=\"embla__viewport\" ref={emblaRed}>\n        <div className=\"embla__container\">\n          {slides.map((index) => (\n            <LazyLoadImage\n              key={index}\n              index={index}\n              imgSrc={imageByIndex(index)}\n              inView={slidesInView.indexOf(index) > -1}\n            />\n          ))}\n        </div>\n      </div>\n    </div>\n  )\n}\n\nexport default EmblaCarousel\n"}}]);
//# sourceMappingURL=107-8b7c64afdd425603e098.js.map