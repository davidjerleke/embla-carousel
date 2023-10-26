import { NgModule } from '@angular/core'
import { EmblaOptionsType } from 'embla-carousel'
import { EmblaCarouselDirective } from './components/embla-carousel.directive'
import { provideEmblaGlobalOptions } from './utils'

@NgModule({
  declarations: [],
  imports: [EmblaCarouselDirective],
  exports: [EmblaCarouselDirective]
})
export class EmblCarouselaModule {
  static forRoot(options?: EmblaOptionsType) {
    return {
      ngModule: EmblCarouselaModule,
      providers: [provideEmblaGlobalOptions(options)]
    }
  }
}
