import { URLS } from 'consts/urls'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxConfigType } from 'consts/sandbox'

const SANDBOX_IMAGE_URLS: string[] = arrayFromNumber(4).map((index) => {
  return `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-${
    index + 1
  }.jpg`
})

export const createSandboxImages = (
  pathToImageFolder: string
): SandboxConfigType['files'] => {
  return SANDBOX_IMAGE_URLS.reduce(
    (allImages, imageUrl, index) => ({
      ...allImages,
      [`${pathToImageFolder}/slide-${index + 1}.jpg`]: {
        isBinary: true,
        content: imageUrl
      }
    }),
    {}
  )
}
