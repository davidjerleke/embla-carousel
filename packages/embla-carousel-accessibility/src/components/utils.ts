import { EmblaCarouselType } from 'embla-carousel'
import { AttributeHandlerType } from './AttributeHandler'
import { RootNodeType } from './Options'

export type FocusNodesBySlideType = {
  focusAttributes: AttributeHandlerType
  prevTabIndex: string | null
}[]

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export type ChildNodeSubjectType = Element | string

export function getChildNode(
  root: HTMLElement,
  subject: ChildNodeSubjectType
): Element {
  const node = isString(subject) ? root.querySelector(subject) : subject
  return <Element>node
}

export type ChildNodesSubjectType = Element[] | HTMLCollection | string

export function getChildNodes(
  root: HTMLElement,
  subject: ChildNodesSubjectType
): Element[] {
  const node = isString(subject) ? root.querySelectorAll(subject) : subject
  return <Element[]>Array.from(node)
}

export function getAccessibilityRootNode(
  emblaApi: EmblaCarouselType,
  rootNode: RootNodeType
): HTMLElement {
  const emblaRootNode = emblaApi.rootNode()
  return (rootNode && rootNode(emblaRootNode)) || emblaRootNode
}
