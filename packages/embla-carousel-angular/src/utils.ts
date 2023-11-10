import { InjectionToken, Provider } from '@angular/core'
import { EmblaOptionsType } from 'embla-carousel'

export const EMBLA_OPTIONS_TOKEN = new InjectionToken<
  EmblaOptionsType | undefined
>('embla global options', {
  factory: () => undefined
})

export function provideEmblaGlobalOptions(
  options?: EmblaOptionsType
): Provider[] {
  return [
    {
      provide: EMBLA_OPTIONS_TOKEN,
      useValue: options
    }
  ]
}
