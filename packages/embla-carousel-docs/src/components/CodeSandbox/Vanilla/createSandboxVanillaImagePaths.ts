import { SANDBOX_VANILLA_FOLDERS } from './sandboxVanillaFolders'

const IMG_SRC_WITH_HASH_REGEX = /\/static\/slide-\d{1,}-.+?\./g
const IMG_SLIDE_WITH_NUMBER_REGEX = /slide-\d{1,}/

export const createSandboxVanillaImagePaths = (
  carouselHtml: string,
): string => {
  return carouselHtml.replace(IMG_SRC_WITH_HASH_REGEX, (match) => {
    const slideWithNumber = match.match(IMG_SLIDE_WITH_NUMBER_REGEX) || []
    return `${SANDBOX_VANILLA_FOLDERS.IMAGES}/${slideWithNumber}.`
  })
}
