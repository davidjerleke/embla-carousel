import React from 'react';
import { IosPickerItem } from './CarouselIosPickerItem';

const EmblaCarousel = (props) => {
    const { loop } = props;
    
    return (<div className="embla">
      <IosPickerItem slideCount={24} perspective="left" loop={loop} label="hours"/>
      <IosPickerItem slideCount={60} perspective="right" loop={loop} label="min"/>
    </div>);
};

export default EmblaCarousel;
