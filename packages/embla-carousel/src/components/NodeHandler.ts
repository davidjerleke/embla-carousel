import { OptionsType } from './Options'
import { isString, WindowType } from './utils'

export type NodeRectType = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export type NodeRectsType = {
  containerRect: NodeRectType
  slideRects: NodeRectType[]
}

type NodesType = {
  root: HTMLElement
  container: HTMLElement
  slides: HTMLElement[]
}

export type NodeHandlerType = {
  ownerDocument: Document | null
  ownerWindow: WindowType | null
  getNodes: (options: OptionsType) => NodesType
  getRect: (node: HTMLElement) => NodeRectType
  getRects: (
    container: HTMLElement,
    slides: HTMLElement[],
    fromCache?: boolean
  ) => NodeRectsType
}

export function NodeHandler(root: HTMLElement): NodeHandlerType {
  const ownerDocument = root ? root.ownerDocument : null
  const ownerWindow = ownerDocument
    ? <WindowType>ownerDocument.defaultView
    : null

  let rects: NodeRectsType

  function getRect(node: HTMLElement): NodeRectType {
    const { offsetTop: top, offsetLeft: left, offsetWidth, offsetHeight } = node
    const offset: NodeRectType = {
      top,
      right: left + offsetWidth,
      bottom: top + offsetHeight,
      left,
      width: offsetWidth,
      height: offsetHeight
    }

    return offset
  }

  function getRects(
    container: HTMLElement,
    slides: HTMLElement[],
    fromCache?: boolean
  ): NodeRectsType {
    if (fromCache && rects) return rects

    const containerStyle = root ? container.style : { transform: '' }
    const previousTransform = containerStyle.transform
    containerStyle.transform = 'none'

    const containerRect = getRect(container)
    const slideRects = slides.map(getRect)

    containerStyle.transform = previousTransform
    rects = { containerRect, slideRects }
    return rects
  }

  function createSsrNode(
    offsetLeft: number,
    offsetTop: number,
    offsetWidth: number,
    offsetHeight: number
  ): HTMLElement {
    return <HTMLElement>{ offsetLeft, offsetTop, offsetWidth, offsetHeight }
  }

  function getBrowserNodes(options: OptionsType): NodesType {
    const { container: userContainer, slides: userSlides } = options

    const containerNode = isString(userContainer)
      ? root.querySelector(userContainer)
      : userContainer
    const container = <HTMLElement>(containerNode || root.children[0])

    const slideNodes = isString(userSlides)
      ? container.querySelectorAll(userSlides)
      : userSlides
    const slides = <HTMLElement[]>Array.from(slideNodes || container.children)

    return { root, container, slides }
  }

  function getSsrNodes(options: OptionsType): NodesType {
    const rootSize = 100
    const root = createSsrNode(0, 0, rootSize, rootSize)
    const container = root
    let startOffset = 0

    const slides = options.ssr.map((size) => {
      const slide = createSsrNode(startOffset, startOffset, size, size)
      startOffset += size
      return slide
    })

    return { root, container, slides }
  }

  function getNodes(options: OptionsType): NodesType {
    return root ? getBrowserNodes(options) : getSsrNodes(options)
  }

  const self: NodeHandlerType = {
    ownerDocument,
    ownerWindow,
    getNodes,
    getRect,
    getRects
  }
  return self
}
