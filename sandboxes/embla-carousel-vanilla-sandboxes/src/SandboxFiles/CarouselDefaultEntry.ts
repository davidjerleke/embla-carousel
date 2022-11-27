import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')

// @ts-ignore
const emblaApi = EmblaCarousel(viewPortNode, OPTIONS)
