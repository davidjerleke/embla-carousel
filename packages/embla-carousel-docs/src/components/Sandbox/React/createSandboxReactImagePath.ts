const IMAGE_BY_INDEX_IMPORT_REGEX = /import(.*)from\s'..\/imageByIndex/

export const createSandboxReactImagePath = (carouselScript: string): string => {
  return carouselScript.replace(IMAGE_BY_INDEX_IMPORT_REGEX, (match) =>
    match.replace('../', './')
  )
}
