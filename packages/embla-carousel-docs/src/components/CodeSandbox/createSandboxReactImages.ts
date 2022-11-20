const imageByIndex: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/imageByIndex.js').default
// Add ts too!

export const createSandboxReactImages = (): string => {
  return imageByIndex.replace(
    new RegExp('../../../../packages/embla-carousel-docs/src/assets', 'g'),
    '..',
  )
}
