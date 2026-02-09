import packageJson from '../../../packages/embla-carousel/package.json'
import { GlobalDataContextType } from '@/components/Global/GlobalDataContext'
import { capitalizeFirstLetter } from '@/utils/string-casing'

/* UTILS */
export function getGlobalData(): GlobalDataContextType {
  const title = packageJson.name
    .split('-')
    .map((part) => capitalizeFirstLetter(part))
    .join(' ')

  return {
    title,
    description: packageJson.description,
    author: packageJson.author,
    latestVersion: packageJson.version
  }
}
