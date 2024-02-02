import { arrayFromNumber } from 'utils/arrayFromNumber'

export const createSlides = (
  containerNode: HTMLElement,
  count: number = 5
): HTMLElement[] => {
  const template = <HTMLElement>document.getElementById('embla-slide-template')

  containerNode.innerHTML = arrayFromNumber(count).reduce(
    (acc, index) =>
      acc +
      template.innerHTML.replace(
        '__replace_slide_index__',
        (index + 1).toString()
      ),
    ''
  )

  return Array.from(containerNode.querySelectorAll('.embla__slide'))
}
