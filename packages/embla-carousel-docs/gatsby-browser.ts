import { GatsbyBrowser } from 'gatsby'

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({ location }) => {
  const { hash } = location
  if (!hash) return

  const id = hash.substring(1, hash.length)
  const element = document.getElementById(id)

  if (element) element.scrollIntoView()
}
