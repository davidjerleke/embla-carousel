import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import ClassNames from 'embla-carousel-class-names'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')

// @ts-ignore
const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [ClassNames()])
