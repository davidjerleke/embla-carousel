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
}

export function OptionsHandler(): OptionsHandlerType {
  function merge<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB?: TypeB,
  ): TypeA {
    return <TypeA>objectsMergeDeep(optionsA, optionsB || {})
  }

  function areEqual<TypeA extends OptionsType, TypeB extends OptionsType>(
    optionsA: TypeA,
    optionsB: TypeB,
  ): boolean {
    const breakpointsA = JSON.stringify(objectKeys(optionsA.breakpoints || {}))
    const breakpointsB = JSON.stringify(objectKeys(optionsB.breakpoints || {}))
    if (breakpointsA !== breakpointsB) return false
    return objectsAreEqual(optionsA, optionsB)
  }

  function atMedia<Type extends OptionsType>(options: Type): Type {
    const optionsAtMedia = options.breakpoints || {}
    const matchedMediaOptions = objectKeys(optionsAtMedia)
      .filter((media) => window.matchMedia(media).matches)
      .map((media) => optionsAtMedia[media])
      .reduce((a, mediaOption) => merge(a, mediaOption), {})

    return merge(options, matchedMediaOptions)
  }

  const self: OptionsHandlerType = {
    merge,
    areEqual,
    atMedia,
  }
  return self
}
