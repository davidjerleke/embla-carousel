import { LooseOptionsType, CreateOptionsType } from './Options'
import { objectKeys, objectsAreEqual, objectsMergeDeep } from './utils'

type OptionsType = Partial<CreateOptionsType<LooseOptionsType>>

export type OptionsHandlerType = {
  merge: <TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB,
  ) => TypeA
  areEqual: <TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB: TypeB,
  ) => boolean
  atMedia: <Type extends OptionsType>(options: Type) => Type
  mediaQueries: (optionsList: OptionsType[]) => MediaQueryList[]
}

export function OptionsHandler(): OptionsHandlerType {
  function merge<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB,
  ): TypeA {
    return <TypeA>objectsMergeDeep(optionsA, optionsB || {})
  }

  // TODO: Move to embla-carousel-reactive-utils
  function areEqual<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB: TypeB,
  ): boolean {
    return objectsAreEqual(optionsA, optionsB) // TODO: Move to embla-carousel-reactive-utils
  }

  function atMedia<Type extends OptionsType>(options: Type): Type {
    const optionsAtMedia = options.breakpoints || {}
    const matchedMediaOptions = objectKeys(optionsAtMedia)
      .filter((media) => window.matchMedia(media).matches)
      .map((media) => optionsAtMedia[media])
      .reduce((a, mediaOption) => merge(a, mediaOption), {})

    return merge(options, matchedMediaOptions)
  }

  function mediaQueries(optionsList: OptionsType[]): MediaQueryList[] {
    return optionsList
      .map((options) => objectKeys(options.breakpoints || {}))
      .reduce((acc, mediaQueries) => acc.concat(mediaQueries), [])
      .map(matchMedia)
  }

  const self: OptionsHandlerType = {
    merge,
    areEqual,
    atMedia,
    mediaQueries,
  }
  return self
}
