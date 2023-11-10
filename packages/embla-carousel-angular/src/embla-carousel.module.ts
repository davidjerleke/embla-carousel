import { NgModule } from '@angular/core'
import { EmblaOptionsType } from 'embla-carousel'
import { EmblaCarouselDirective } from './components/embla-carousel.directive'
import { provideEmblaGlobalOptions } from './utils'

@NgModule({
  declarations: [],
  imports: [EmblaCarouselDirective],
  exports: [EmblaCarouselDirective]
})
export class EmblaCarouselModule {
  static forRoot(options?: EmblaOptionsType) {
    return {
      ngModule: EmblaCarouselModule,
      providers: [provideEmblaGlobalOptions(options)]
    }
  }
}
