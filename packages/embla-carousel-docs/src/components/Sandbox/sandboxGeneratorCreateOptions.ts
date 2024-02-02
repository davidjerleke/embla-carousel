import { SandboxGeneratorSettingsType } from 'consts/sandbox'
import { EmblaOptionsType } from 'embla-carousel'

export const sandboxGeneratorCreateOptions = (
  settings: SandboxGeneratorSettingsType
): EmblaOptionsType => {
  const {
    axis,
    align,
    direction,
    containScroll,
    loop,
    dragFree,
    slidesToScroll
  } = settings

  return {
    ...(axis !== 'x' && { axis }),
    ...(align !== 'center' && { align }),
    ...(dragFree && { dragFree }),
    ...(direction !== 'ltr' && axis === 'x' && { direction }),
    ...(!loop && !containScroll && { containScroll: false }),
    ...(loop && { loop }),
    ...(slidesToScroll !== 1 && { slidesToScroll })
  }
}
