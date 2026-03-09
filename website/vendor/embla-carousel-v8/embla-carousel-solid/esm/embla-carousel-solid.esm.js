import EmblaCarousel from 'embla-carousel';
import { canUseDOM, areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils';
import { createSignal, createEffect, on, onCleanup } from 'solid-js';

function createEmblaCarousel(options, plugins) {
  let storedOptions = options ? options() : {};
  let storedPlugins = plugins ? plugins() : [];
  const [emblaApi, setEmblaApi] = createSignal();
  const [viewport, setViewport] = createSignal();
  function reInit() {
    const api = emblaApi();
    if (api) api.reInit(storedOptions, storedPlugins);
  }
  createEffect(on(viewport, viewport => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = createEmblaCarousel.globalOptions;
      const newEmblaApi = EmblaCarousel(viewport, storedOptions, storedPlugins);
      setEmblaApi(newEmblaApi);
      onCleanup(() => newEmblaApi.destroy());
    } else {
      setEmblaApi(undefined);
    }
  }));
  createEffect(() => {
    if (!canUseDOM()) return;
    const newOptions = options ? options() : {};
    if (areOptionsEqual(storedOptions, newOptions)) return;
    storedOptions = newOptions;
    reInit();
  });
  createEffect(() => {
    if (!canUseDOM()) return;
    const newPlugins = plugins ? plugins() : [];
    if (arePluginsEqual(storedPlugins, newPlugins)) return;
    storedPlugins = newPlugins;
    reInit();
  });
  return [setViewport, emblaApi];
}
createEmblaCarousel.globalOptions = undefined;

export { createEmblaCarousel as default };
//# sourceMappingURL=embla-carousel-solid.esm.js.map
