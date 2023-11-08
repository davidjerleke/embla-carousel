import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {
  EmblaCarouselDirective,
  provideEmblaGlobalOptions
} from 'embla-carousel-angular'
import { AppComponent } from './app.component'
import { CarouselComponent } from './carousel/carousel.component'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, CarouselComponent],
  imports: [BrowserModule, EmblaCarouselDirective],
  providers: [provideEmblaGlobalOptions({})]
})
export class AppModule {}
