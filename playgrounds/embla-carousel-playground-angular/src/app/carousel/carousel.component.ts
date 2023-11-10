import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'
import {
  EmblaCarouselDirective,
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-angular'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild(EmblaCarouselDirective, { static: false })
  emblaRef!: EmblaCarouselDirective

  @Input() options: EmblaOptionsType = {}
  @Input() slides: number[] = []

  prevBtnEnabled = false
  nextBtnEnabled = false
  selectedIndex = 0
  scrollSnaps: number[] = []

  constructor() {}

  ngAfterViewInit(): void {
    this.scrollSnaps = this.emblaRef.emblaApi.scrollSnapList()
    this.onSelect(this.emblaRef.emblaApi)
    this.emblaRef.emblaApi.on('reInit', this.onSelect.bind(this))
    this.emblaRef.emblaApi.on('select', this.onSelect.bind(this))
  }

  imageByIndex(index: number) {
    return `/assets/images/slide-${index}.jpg`
  }

  scrollPrev() {
    this.emblaRef && this.emblaRef.emblaApi.scrollPrev()
  }

  scrollNext() {
    this.emblaRef && this.emblaRef.emblaApi.scrollNext()
  }

  scrollTo(index: number) {
    this.emblaRef && this.emblaRef.emblaApi.scrollTo(index)
  }

  onSelect(emblaApi: EmblaCarouselType) {
    this.selectedIndex = emblaApi.selectedScrollSnap()
    this.prevBtnEnabled = emblaApi.canScrollPrev()
    this.nextBtnEnabled = emblaApi.canScrollNext()
  }
}
