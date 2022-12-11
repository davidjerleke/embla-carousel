import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import imageByIndex from '../imageByIndex';

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const [emblaRef] = useEmblaCarousel(options);
    
    return (<div className="embla">
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
    </div>);
};

export default EmblaCarousel;
