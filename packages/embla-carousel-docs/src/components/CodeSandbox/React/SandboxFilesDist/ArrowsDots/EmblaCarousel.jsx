import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, PrevButton, NextButton, } from './EmblaCarouselArrowsDotsButtons';
import imageByIndex from '../imageByIndex';

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
    
    const onSelect = useCallback(() => {
        if (!emblaApi)
            return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi, setSelectedIndex]);
    
    useEffect(() => {
        if (!emblaApi)
            return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, setScrollSnaps, onSelect]);
    
    return (<>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (<div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img className="embla__slide__img" src={imageByIndex(index)} alt="Your alt text"/>
              </div>))}
          </div>
        </div>
 
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled}/>
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled}/>
      </div>
 
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (<DotButton key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)}/>))}
      </div>
    </>);
};

export default EmblaCarousel;
