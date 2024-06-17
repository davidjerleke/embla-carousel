import { GatsbyBrowser } from 'gatsby'
import { ReduxProvider } from './src/components/Redux/ReduxProvider'

export const wrapRootElement = ReduxProvider

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({ location }) => {
  const { hash } = location
  if (!hash) return

  const id = hash.substring(1, hash.length)
  const element = document.getElementById(id)

  if (element) element.scrollIntoView()
}
