export type TestElementDimensionsType = {
  containerRect?: DOMRect
  slideRects: DOMRect[]
  endMargin: {
    property: 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom'
    value: number
  }
}

function mockNodeRects(node: HTMLElement, rect: DOMRect): void {
  Object.defineProperty(node, 'offsetTop', { value: rect.top })
  Object.defineProperty(node, 'offsetLeft', { value: rect.left })
  Object.defineProperty(node, 'offsetWidth', { value: rect.width })
  Object.defineProperty(node, 'offsetHeight', { value: rect.height })
}

export function mockTestElementDimensions(
  dimensions: TestElementDimensionsType,
  rootNode: HTMLElement
): void {
  const { containerRect, slideRects, endMargin } = dimensions
  const containerNode = <HTMLElement>rootNode.children[0]
  const slideNodes = slideRects.map(() => document.createElement('div'))

  if (!containerRect) return

  containerNode.innerHTML = ''
  slideNodes.forEach((slideNode) => containerNode.appendChild(slideNode))

  mockNodeRects(rootNode, containerRect)
  mockNodeRects(containerNode, containerRect)
  slideNodes.forEach((s, i) => mockNodeRects(s, slideRects[i]))

  if (!slideNodes.length) return

  const lastSlide = slideNodes[slideNodes.length - 1]
  lastSlide.style[endMargin.property] = `${endMargin.value}px`
}

export function mockTestElements(
  dimensions: TestElementDimensionsType
): HTMLElement {
  const { containerRect } = dimensions
  const rootNode = document.createElement('div')
  const containerNode = document.createElement('div')

  if (containerRect) {
    rootNode.appendChild(containerNode)
    mockTestElementDimensions(dimensions, rootNode)
  }

  return rootNode
}
