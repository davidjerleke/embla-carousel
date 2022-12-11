import { setupIosPicker } from './ios-picker'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const LOOP = false

const wheelNodes = document.querySelectorAll('.embla__ios-picker__viewport')
const iosPickerNodes = Array.from(wheelNodes)

// @ts-ignore
const iosPickers = iosPickerNodes.map((iosPickerNode) =>
  setupIosPicker(iosPickerNode, {
    dragFree: true,
    loop: LOOP,
    axis: 'y',
  }),
)
