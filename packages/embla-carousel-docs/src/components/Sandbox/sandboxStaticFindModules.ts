const IMPORT_LOCAL_MODULE_REGEX = /from\s'.\/EmblaCarousel(.*)'/g
const MODULE_LOCAL_NAME_REGEX = /.+?(?=EmblaCarousel)/

export const sandboxStaticFindLocalModules = (
  carouselScript: string
): string[] => {
  const modulesMatch = carouselScript.match(IMPORT_LOCAL_MODULE_REGEX) || []
  return modulesMatch.map((match) =>
    match.replace(MODULE_LOCAL_NAME_REGEX, '').replace(/'/, '')
  )
}

const IMPORT_SHARED_MODULE_REGEX = /from\s'..(.*)\/EmblaCarousel(.*)'/g
const MODULE_SHARED_NAME_REGEX = /.+?(?=EmblaCarousel)/

export const sandboxStaticFindSharedModules = (
  carouselScript: string
): string[] => {
  const modulesMatch = carouselScript.match(IMPORT_SHARED_MODULE_REGEX) || []
  return modulesMatch.map((match) =>
    match.replace(MODULE_SHARED_NAME_REGEX, '').replace(/'/, '')
  )
}
