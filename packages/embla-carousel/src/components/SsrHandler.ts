import { OptionsHandlerType } from './OptionsHandler'
import { CreateOptionsType, OptionsType } from './Options'
import { EngineType } from './Engine'
import { NodesType } from './NodeHandler'
import { CreatePluginType } from './Plugins'

export type EmblaSsrHandlerType = {
  getNodes: () => NodesType
  getStyles: (containerSelector: string, slidesSelector?: string) => string
  setup(
    createEngine: (
      options: OptionsType,
      container: HTMLElement,
      slides: HTMLElement[],
      useCachedRects?: boolean
    ) => EngineType,
    mergeOptions: OptionsHandlerType['mergeOptions'],
    options: OptionsType
  ): void
}

export type EmblaSsrOptionsType = Omit<
  CreateOptionsType<{ slideSizes: number[] }>,
  'active'
>

export type EmblaSsrType = CreatePluginType<
  EmblaSsrHandlerType,
  EmblaSsrOptionsType
>
