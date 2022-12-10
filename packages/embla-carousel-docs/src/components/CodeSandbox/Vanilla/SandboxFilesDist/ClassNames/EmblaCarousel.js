import EmblaCarousel from 'embla-carousel'
import ClassNames from 'embla-carousel-class-names'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')

// @ts-ignore
const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [ClassNames()])
