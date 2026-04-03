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
  getRectsAsync: (
    container: HTMLElement,
    slides: HTMLElement[],
    ownerWindow: WindowType,
    callback: (rects: NodeRectsType) => void
  ) => () => void
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

  function getRectsAsync(
    container: HTMLElement,
    slides: HTMLElement[],
    ownerWindow: WindowType,
    callback: (rects: NodeRectsType) => void
  ): () => void {
    const allNodes = [container, ...slides]
    const rectMap = new Map<HTMLElement, NodeRectType>()
    let settled = false

    const observer = new ownerWindow.ResizeObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement
        const { inlineSize: width, blockSize: height } =
          entry.borderBoxSize[0]
        rectMap.set(node, {
          top: node.offsetTop,
          left: node.offsetLeft,
          right: node.offsetLeft + width,
          bottom: node.offsetTop + height,
          width,
          height
        })
      }

      if (rectMap.size === allNodes.length && !settled) {
        settled = true
        observer.disconnect()
        rects = {
          containerRect: rectMap.get(container)!,
          slideRects: slides.map((s) => rectMap.get(s)!)
        }
        callback(rects)
      }
    })

    allNodes.forEach((node) => observer.observe(node))

    return () => {
      settled = true
      observer.disconnect()
    }
  }

  const self: NodeHandlerType = {
    ownerDocument,
    ownerWindow,
    getNodes,
    getRect,
    getRects,
    getRectsAsync
  }
  return self
}
