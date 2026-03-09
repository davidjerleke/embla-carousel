import { ActionReturn } from 'svelte/action';
import { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
type EmblaCarouselParameterType = {
    options: EmblaOptionsType;
    plugins: EmblaPluginType[];
};
type EmblaCarouselAttributesType = {
    'on:emblaInit'?: (evt: CustomEvent<EmblaCarouselType>) => void;
    onemblaInit?: (evt: CustomEvent<EmblaCarouselType>) => void;
};
export type EmblaCarouselSvelteType = ActionReturn<EmblaCarouselParameterType, EmblaCarouselAttributesType>;
declare function emblaCarouselSvelte(emblaNode: HTMLElement, emblaConfig?: EmblaCarouselParameterType): EmblaCarouselSvelteType;
declare namespace emblaCarouselSvelte {
    let globalOptions: EmblaOptionsType | undefined;
}
export default emblaCarouselSvelte;
