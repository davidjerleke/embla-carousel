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

export type NodesType = {
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

export function NodeHandler(root?: HTMLElement | null): NodeHandlerType {
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

  function getNodes(options: OptionsType): NodesType {
    if (!root) {
      return { root: <HTMLElement>{}, container: <HTMLElement>{}, slides: [] }
    }
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

  const self: NodeHandlerType = {
    ownerDocument,
    ownerWindow,
    getNodes,
    getRect,
    getRects
  }
  return self
}
