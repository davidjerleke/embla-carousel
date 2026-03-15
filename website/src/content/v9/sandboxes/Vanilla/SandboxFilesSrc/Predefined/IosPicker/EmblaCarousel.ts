import { EmblaOptionsType } from 'embla-carousel'
import { setupIosPicker } from './EmblaCarouselIosPicker'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const wheelNodes = document.querySelectorAll('.embla__ios-picker__viewport')
const iosPickerNodes = <HTMLElement[]>Array.from(wheelNodes)

// @ts-ignore
const iosPickers = iosPickerNodes.map((iosPickerNode) =>
  setupIosPicker(iosPickerNode, {
    dragFree: true,
    containScroll: false,
    loop: OPTIONS.loop,
    axis: 'y',
    slideChanges: false
  })
)
