import { NodeHandlerType } from './NodeHandler'
import { LooseOptionsType, CreateOptionsType } from './Options'
import { objectKeys, objectsMergeDeep, WindowType } from './utils'

type OptionsType = Partial<CreateOptionsType<LooseOptionsType>>

export type OptionsHandlerType = {
  init: (windowInstance: NodeHandlerType['ownerWindow']) => void
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
    if (!ownerWindow) return
    windowInstance = ownerWindow
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
      .reduce((a, mediaOption) => mergeOptions(a, mediaOption), {})

    return mergeOptions(options, matchedMediaOptions)
  }

  function optionsMediaQueries(optionsList: OptionsType[]): MediaQueryList[] {
    if (!windowInstance) return []

    return optionsList
      .map((options) => objectKeys(options.breakpoints || {}))
      .reduce((acc, mediaQueries) => acc.concat(mediaQueries), [])
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
