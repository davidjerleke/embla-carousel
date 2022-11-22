export const createSandboxReactImages = async (): Promise<string> => {
  const imageByIndex = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/imageByIndex.js'
  )
  // Add ts too!

  return imageByIndex.default.replace(
    new RegExp('../../../../packages/embla-carousel-docs/src/assets', 'g'),
    '..',
  )
}
