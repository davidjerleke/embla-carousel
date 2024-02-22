const IMG_SRC_WITH_HASH_REGEX = /\/static\/slide-\d{1,}-.+?\.jpg/g
const IMG_SLIDE_WITH_NUMBER_REGEX = /slide-\d{1,}/
const IMG_NUMBER_REGEX = /slide-/

export const createSandboxVanillaImagePaths = (
  carouselHtml: string
): string => {
  return carouselHtml.replace(IMG_SRC_WITH_HASH_REGEX, (match) => {
    const slideWithNumber = match.match(IMG_SLIDE_WITH_NUMBER_REGEX) || ['']
    const index = slideWithNumber[0].replace(IMG_NUMBER_REGEX, '')
    return `https://picsum.photos/600/350?v=${index}`
  })
}
