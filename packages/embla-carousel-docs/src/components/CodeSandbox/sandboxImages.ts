import { URLS } from 'consts/urls'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { SandboxConfigType } from './sandboxTypes'

export const SANDBOX_IMAGE_URLS: string[] = arrayFromNumber(4).map((index) => {
  return `${URLS.GITHUB_DOCUMENTATION_RAW}/src/assets/images/slide-${
    index + 1
  }.jpg`
})

export const SANDBOX_IMAGES: SandboxConfigType['files'] =
  SANDBOX_IMAGE_URLS.reduce((allImages, imageUrl, index) => {
    return {
      ...allImages,
      [`src/images/slide-${index + 1}.jpg`]: {
        isBinary: true,
        content: imageUrl,
      },
    }
  }, {})
