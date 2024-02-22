const IMAGES_IMPORT_REGEX = /import\s{\ssandboxImages\s}\sfrom\s'(.*)/
const IMAGES_FUNCTION_REGEX = /sandboxImages\(index\)/

export const createSandboxReactImagePaths = (
  carouselScript: string
): string => {
  return carouselScript
    .replace(IMAGES_IMPORT_REGEX, '')
    .replace(
      IMAGES_FUNCTION_REGEX,
      '`https://picsum.photos/600/350?v=${index}`'
    )
}
