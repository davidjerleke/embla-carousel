import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  SimpleChanges
} from '@angular/core'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import {
  areOptionsEqual,
  arePluginsEqual,
  canUseDOM
} from 'embla-carousel-reactive-utils'
import { EMBLA_OPTIONS_TOKEN } from '../utils'

@Directive({
  selector: '[ngx-embla]',
  exportAs: 'emblaNode',
  standalone: true
})
export class EmblaCarouselDirective {
  @Input() options: EmblaOptionsType = {}
  @Input() plugins: EmblaPluginType[] = []

  @Output() emblaEvent = new EventEmitter<EmblaEventType>()

  storedOptions = this.options
  storedPlugins = this.plugins
  emblaApi!: EmblaCarouselType

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    @Inject(EMBLA_OPTIONS_TOKEN) globalOptions: EmblaOptionsType | undefined
  ) {
    EmblaCarousel.globalOptions = globalOptions
  }

  ngAfterViewInit(): void {
    if (!canUseDOM() || !this._elementRef?.nativeElement) return
    this.emblaApi = EmblaCarousel(
      this._elementRef.nativeElement,
      this.storedOptions,
      this.storedPlugins
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { plugins, options } = changes

    if (options && !areOptionsEqual(this.storedOptions, options.currentValue)) {
      this.storedOptions = options.currentValue
      this.reInit()
    }

    if (plugins && !arePluginsEqual(this.storedPlugins, plugins.currentValue)) {
      this.storedPlugins = plugins.currentValue
      this.reInit()
    }
  }

  reInit() {
    if (!this.emblaApi) {
      return
    }

    this.emblaApi.reInit(this.storedOptions, this.storedPlugins)
  }

  ngOnDestroy(): void {
    this.emblaApi && this.emblaApi.destroy()
  }
}
