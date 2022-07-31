import 'inter-ui/inter.css'

export const onClientEntry = async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
  if (!Object.assign) {
    await import('core-js/features/object/assign')
  }
}

export const onRouteUpdate = ({ location }) => {
  const { hash } = location
  if (hash) {
    const id = hash.substring(1, hash.length)
    const element = document.getElementById(id)
    if (element) {
      const topOffset = 60
      const Y = element.getBoundingClientRect().top + window.scrollY - topOffset
      window.scroll(0, Y)
    }
  }
}
