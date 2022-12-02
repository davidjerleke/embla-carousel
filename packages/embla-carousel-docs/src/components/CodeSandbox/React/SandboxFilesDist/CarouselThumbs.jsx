import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './CarouselThumbsButton';
import imageByIndex from './imageByIndex';

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });
    
    const onThumbClick = useCallback((index) => {
        if (!emblaMainApi || !emblaThumbsApi)
            return;
        if (emblaThumbsApi.clickAllowed())
            emblaMainApi.scrollTo(index);
    }, [emblaMainApi, emblaThumbsApi]);
    
    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi)
            return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);
    
    useEffect(() => {
        if (!emblaMainApi)
            return;
        onSelect();
        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);
    
    return (<div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((index) => (<div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img className="embla__slide__img" src={imageByIndex(index)} alt="Your alt text"/>
            </div>))}
        </div>
      </div>
 
      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((index) => (<Thumb onClick={() => onThumbClick(index)} selected={index === selectedIndex} index={index} imgSrc={imageByIndex(index)} key={index}/>))}
          </div>
        </div>
      </div>
    </div>);
};

export default EmblaCarousel;
