const REMOVE_IMAGE_HASH_REGEX = /(?<=slide-\d)(.*?)(?=.jpg)/g
const REWRITE_IMAGE_PATH_REGEX = /\/static\//g

export const createSandboxVanillaImagePaths = (
  carouselHtml: string,
): string => {
  return carouselHtml
    .replace(REMOVE_IMAGE_HASH_REGEX, '')
    .replace(REWRITE_IMAGE_PATH_REGEX, 'src/images/')
}
