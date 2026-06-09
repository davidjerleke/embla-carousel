import { EmblaEventCallbackType } from 'embla-carousel'

const logPointerDown: EmblaEventCallbackType<'pointerdown'> = (
  emblaApi,
  event
) => {
  console.log(event) // Will contain correct event type and detail
}
