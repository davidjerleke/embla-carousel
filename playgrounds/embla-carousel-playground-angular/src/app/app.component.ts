import { Component } from '@angular/core'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  OPTIONS: EmblaOptionsType = {}
  SLIDES = arrayFromNumber(4)
}
