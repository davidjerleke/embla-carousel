import { EmblaCarouselType, type EmblaOptionsType, type EmblaPluginType } from 'embla-carousel';
import { Accessor, Setter } from 'solid-js';
export type CreateEmblaCarouselType = [
    Setter<HTMLElement | undefined>,
    Accessor<EmblaCarouselType | undefined>
];
declare function createEmblaCarousel(options?: Accessor<EmblaOptionsType>, plugins?: Accessor<EmblaPluginType[]>): CreateEmblaCarouselType;
declare namespace createEmblaCarousel {
    let globalOptions: EmblaOptionsType | undefined;
}
export default createEmblaCarousel;
