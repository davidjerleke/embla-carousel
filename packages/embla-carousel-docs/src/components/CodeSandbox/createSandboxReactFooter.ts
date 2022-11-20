import { URLS } from 'consts/urls'

const footer: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Footer.jsx').default
// Add tsx too!

export const createSandboxReactFooter = (): string => {
  return footer.replace('__replace_repository_url__', URLS.GITHUB_ROOT)
}
