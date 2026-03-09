'use strict';

var emblaCarouselReactiveUtils = require('embla-carousel-reactive-utils');
var EmblaCarousel = require('embla-carousel');

function emblaCarouselSvelte(emblaNode, emblaConfig = {
  options: {},
  plugins: []
}) {
  let storedEmblaConfig = emblaConfig;
  let emblaApi;
  if (emblaCarouselReactiveUtils.canUseDOM()) {
    EmblaCarousel.globalOptions = emblaCarouselSvelte.globalOptions;
    emblaApi = EmblaCarousel(emblaNode, storedEmblaConfig.options, storedEmblaConfig.plugins);
    emblaApi.on('init', () => emblaNode.dispatchEvent(new CustomEvent('emblaInit', {
      detail: emblaApi
    })));
  }
  return {
    destroy: () => {
      if (emblaApi) emblaApi.destroy();
    },
    update: newEmblaConfig => {
      const optionsChanged = !emblaCarouselReactiveUtils.areOptionsEqual(storedEmblaConfig.options, newEmblaConfig.options);
      const pluginsChanged = !emblaCarouselReactiveUtils.arePluginsEqual(storedEmblaConfig.plugins, newEmblaConfig.plugins);
      if (!optionsChanged && !pluginsChanged) return;
      storedEmblaConfig = newEmblaConfig;
      if (emblaApi) {
        emblaApi.reInit(storedEmblaConfig.options, storedEmblaConfig.plugins);
      }
    }
  };
}
emblaCarouselSvelte.globalOptions = undefined;

module.exports = emblaCarouselSvelte;
//# sourceMappingURL=embla-carousel-svelte.cjs.js.map
