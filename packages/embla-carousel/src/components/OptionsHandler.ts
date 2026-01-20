import { NodeHandlerType } from './NodeHandler'
import { LooseOptionsType, CreateOptionsType } from './Options'
import { objectKeys, objectsMergeDeep, WindowType } from './utils'

type OptionsType = Partial<CreateOptionsType<LooseOptionsType>>

export type OptionsHandlerType = {
  init: (ownerWindow: NodeHandlerType['ownerWindow']) => void
  mergeOptions: <TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB
  ) => TypeA
  optionsAtMedia: <Type extends OptionsType>(options: Type) => Type
  optionsMediaQueries: (optionsList: OptionsType[]) => MediaQueryList[]
}

export function OptionsHandler(): OptionsHandlerType {
  let windowInstance: WindowType

  function init(ownerWindow: NodeHandlerType['ownerWindow']): void {
    if (ownerWindow) windowInstance = ownerWindow
  }

  function mergeOptions<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB
  ): TypeA {
    return <TypeA>objectsMergeDeep(optionsA, optionsB || {})
  }

  function optionsAtMedia<Type extends OptionsType>(options: Type): Type {
    if (!windowInstance) return options

    const optionsAtMedia = options.breakpoints || {}
    const matchedMediaOptions = objectKeys(optionsAtMedia)
      .filter((media) => windowInstance.matchMedia(media).matches)
      .map((media) => optionsAtMedia[media])
      .reduce(
        (mediaOptions, mediaOption) => mergeOptions(mediaOptions, mediaOption),
        {}
      )

    return mergeOptions(options, matchedMediaOptions)
  }

  function optionsMediaQueries(optionsList: OptionsType[]): MediaQueryList[] {
    if (!windowInstance) return []

    return optionsList
      .map((options) => objectKeys(options.breakpoints || {}))
      .reduce((mediaQueries, mediaQuery) => mediaQueries.concat(mediaQuery), [])
      .map(windowInstance.matchMedia)
  }

  const self: OptionsHandlerType = {
    init,
    mergeOptions,
    optionsAtMedia,
    optionsMediaQueries
  }
  return self
}
