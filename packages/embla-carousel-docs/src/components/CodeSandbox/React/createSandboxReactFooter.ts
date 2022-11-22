import { URLS } from 'consts/urls'

export const createSandboxReactFooter = async (): Promise<string> => {
  const footer = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Footer.jsx'
  )
  // Add tsx too!

  return footer.default.replace('__replace_repository_url__', URLS.GITHUB_ROOT)
}
