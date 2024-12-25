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

type NodesType = {
  container: HTMLElement
  slides: HTMLElement[]
}

export type NodeHandlerType = {
  ownerWindow: WindowType | null
  clearOffsets: (...nodes: HTMLElement[]) => void
  getNodes: (options: OptionsType) => NodesType
  getRect: (node: HTMLElement) => NodeRectType
}

export function NodeHandler(
  root: HTMLElement,
  isSsr: boolean
): NodeHandlerType {
  const ownerDocument = isSsr ? null : root.ownerDocument
  const ownerWindow = ownerDocument
    ? <WindowType>ownerDocument.defaultView
    : null

  function clearOffsets(...nodes: HTMLElement[]): void {
    if (isSsr) return

    nodes.forEach((node) => {
      const style = node.style
      if (!style.transform) style.transform = 'none'
    })
  }

  function getRect(node: HTMLElement): NodeRectType {
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = node
    const offset: NodeRectType = {
      top: offsetTop,
      right: offsetLeft + offsetWidth,
      bottom: offsetTop + offsetHeight,
      left: offsetLeft,
      width: offsetWidth,
      height: offsetHeight
    }
    return offset
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

    return { container, slides }
  }

  function getSsrNodes(options: OptionsType): NodesType {
    const containerSize = 100
    const container = createSsrNode(0, 0, containerSize, containerSize)
    let startOffset = 0

    const slides = options.ssr.map((size) => {
      const slide = createSsrNode(startOffset, startOffset, size, size)
      startOffset += size
      return slide
    })

    return { container, slides }
  }

  function getNodes(options: OptionsType): NodesType {
    return isSsr ? getSsrNodes(options) : getBrowserNodes(options)
  }

  const self: NodeHandlerType = {
    ownerWindow,
    clearOffsets,
    getNodes,
    getRect
  }
  return self
}
