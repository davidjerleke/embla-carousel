import { renameImportPath } from '../sandboxUtils'

export const createSandboxReactImagePath = (carouselScript: string): string => {
  return renameImportPath(carouselScript, '../imageByIndex', './imageByIndex')
}
